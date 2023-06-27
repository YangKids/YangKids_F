import { List, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AlarmList = () => {
  const [alarms, setAlarms] = useState([]);
  const getAlarms = async () => {
    const response = await axios.get("http://localhost:8080/api-alarm/alarm", {
      params: {
        userId: JSON.parse(sessionStorage.getItem("loginUser")).id,
      },
    });
    setAlarms(response.data);
  };

  const titleClick = async (alarmId) => {
    try {
      await axios.put(`http://localhost:8080/api-alarm/check/${alarmId}`);
    } catch (error) {}
  };

  const btnClick = async (alarmId) => {
    try {
      const result = await Swal.fire({
        title: "알림을 삭제하시겠습니까?",
        text: "삭제 후에는 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8080/api-alarm/delete`, {
          params: {
            alarmId: alarmId,
          },
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "알림이 삭제되었습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "삭제에 실패했습니다. 다시 시도해보세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    getAlarms();
  }, [alarms]);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={alarms}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link
                  to={`/board/${item.articleId}`}
                  onClick={() => titleClick(item.alarmId)}
                  style={item.isChecked === 1 ? { color: "#9c9c9c" } : {}}
                >
                  {item.content}
                </Link>
              }
              description={
                <span
                  style={
                    item.isChecked === 1
                      ? { color: "#c2c2c2" }
                      : { color: "#707070" }
                  }
                >
                  {item.commentId === 0 && item.type === "댓글"
                    ? "회원님이 작성한 게시글에 댓글이 달렸습니다."
                    : item.commentId === 0 && item.type === "좋아요"
                    ? "누군가 회원님이 작성한 게시글에 좋아요를 눌렀습니다."
                    : item.commentId !== 0 && item.type === "댓글"
                    ? "회원님이 작성한 댓글에 대댓글이 달렸습니다."
                    : item.commentId !== 0 && item.type === "좋아요"
                    ? "누군가 회원님이 작성한 댓글에 좋아요를 눌렀습니다."
                    : ""}
                </span>
              }
            />
            <Button
              icon={<DeleteOutlined />}
              type="text"
              danger
              onClick={() => btnClick(item.alarmId)}
            ></Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AlarmList;
