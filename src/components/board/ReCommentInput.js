import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Form, Input } from "antd";
import Swal from "sweetalert2";

const ReCommentInput = ({
  commentId,
  isAnonymous,
  loginUser,
  clickCreateRecomment,
  createRecommentId,
  readyForReload,
  handleRecomments,
}) => {
  const [recomments, setRecomments] = useState([]);
  const [newReComment, setNewReComment] = useState("");

  useEffect(() => {
    // 댓글 정보를 가져오는 비동기 함수
    const fetchComments = async () => {
      try {
        const json = await (
          await fetch(`http://localhost:8080/api-recomment/list/${commentId}`)
        ).json(); // 서버 API로부터 댓글 정보를 가져옴
        setRecomments(json); // 가져온 게시글 정보를 상태 변수에 저장
      } catch (error) {
        setRecomments([]);
      }
    };
    fetchComments();
  }, [commentId]);

  const handleCreateRecomment = (e) => {
    setNewReComment(e.target.value);
  };

  // 댓글 등록하기
  const clickRecomment = async () => {
    if (!newReComment) {
      Swal.fire({ title: "댓글을 입력해주세요", icon: "info" });
      return;
    }
    try {
      const result = await Swal.fire({
        title: "댓글을 등록하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Save",
      });
      if (result.isConfirmed) {
        const response = await axios({
          method: "POST",
          url: `http://localhost:8080/api-recomment/write`,
          mode: "cors",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          data: {
            writerId: JSON.parse(sessionStorage.getItem("loginUser")).id,
            commentId: createRecommentId,
            content: newReComment,
          },
        });
        if (response.status === 201) {
          const data = response.data;
          Swal.fire("저장에 성공했습니다!", "", "success");
          setRecomments([...recomments, data]);
          setNewReComment("");
          handleRecomments();
          readyForReload();
        } else {
          throw new Error("Failed to create comment");
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "저장에 실패했습니다. 다시 시도해보세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "5px", width: "970px" }}>
      <div>
        {isAnonymous === 0 && loginUser.img ? (
          <Avatar style={{ marginTop: "15px" }} src={loginUser.img} />
        ) : (
          <Avatar
            style={{ marginTop: "15px" }}
            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${loginUser.numId}`}
          />
        )}
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ marginLeft: "10px", marginTop: "10px" }}>
          <span>{isAnonymous === 1 ? "익명" : loginUser.name}</span>

          <Form layout="inline">
            <Form.Item
              name="recomment"
              rules={[
                {
                  required: true,
                  message: "댓글을 입력해주세요!",
                },
              ]}
              style={{ width: "80%" }}
            >
              <Input.TextArea
                name="recomment"
                onChange={handleCreateRecomment}
                showCount
                maxLength={200}
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                onClick={clickRecomment}
                style={{ margin: "10px 0 0 5px" }}
              >
                등록
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReCommentInput;
