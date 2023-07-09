import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Form, List, Input } from "antd";
import {
  EnterOutlined,
  DeleteOutlined,
  FormOutlined,
  ScissorOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

const ReCommentSection = ({ commentIds, isAnonymous, reload }) => {
  const [recomments, setRecomments] = useState([]);
  const [isEdits, setIsEdits] = useState(false);
  const [editRecommentId, setEditRecommentId] = useState(0);
  const [editRecomment, setEditRecomment] = useState("");

  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  // 댓글 정보를 가져오는 비동기 함수
  const fetchRecomments = async () => {
    try {
      const json = await (
        await fetch(`http://localhost:8080/api-recomment/list/${commentIds}`)
      ).json(); // 서버 API로부터 댓글 정보를 가져옴
      setRecomments(json); // 가져온 게시글 정보를 상태 변수에 저장
    } catch (error) {
      setRecomments([]);
    }
  };
  useEffect(() => {
    fetchRecomments();
  }, [commentIds, reload]);

  // 대댓글 삭제하기
  const deleteRecomment = async (recommentId) => {
    try {
      const result = await Swal.fire({
        title: "댓글을 삭제하시겠습니까?",
        text: "삭제 후에는 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      });
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:8080/api-recomment/delete`,
          {
            params: { recommentId: recommentId },
          }
        );
        if (response.data === "SUCCESS") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "댓글이 삭제되었습니다.",
            showConfirmButton: false,
            timer: 1000,
          });
          fetchRecomments();
        }
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

  // 대댓글 수정하기
  const updateRecomment = async () => {
    if (editRecomment === "") {
      Swal.fire({ title: "수정할 댓글을 입력해주세요", icon: "info" });
      return;
    }
    try {
      const result = await Swal.fire({
        title: "댓글을 수정하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Save",
      });
      if (result.isConfirmed) {
        await fetch(`http://localhost:8080/api-recomment/update`, {
          method: "PUT",
          body: JSON.stringify({
            recommentId: editRecommentId,
            content: editRecomment,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const updatedRecomments = recomments.map((recomment) =>
          recomment.recommentId === editRecommentId
            ? { ...recomment, content: editRecomment }
            : recomment
        );
        Swal.fire("댓글이 수정되었습니다!", "", "success");
        setRecomments(updatedRecomments);
        setIsEdits(false);
        setEditRecomment("");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "수정에 실패했습니다. 다시 시도해보세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleEdit = (recommentId) => {
    setEditRecommentId(recommentId);
    setIsEdits(true);
  };

  const handleUpdateeRecomment = (e) => {
    setEditRecomment(e.target.value);
  };

  const handleCancelSave = () => {
    setIsEdits(false);
  };

  return (
    <div className="RecommenBox">
      {recomments && recomments.length > 0 ? (
        <>
          {/* <hr
            style={{
              height: "0.5px",
              border: 0,
              backgroundColor: "#F0F0F0",
            }}
          /> */}
          <List
            itemLayout="horizontal"
            dataSource={recomments}
            renderItem={(recomment, index) => (
              <>
                <List.Item
                  actions={[
                    recomment && recomment.deletedAt === null ? (
                      isEdits && editRecommentId === recomment.recommentId ? (
                        <div style={{ marginBottom: "90px" }}>
                          <Button
                            icon={<ScissorOutlined />}
                            key="edit"
                            type="text"
                            onClick={updateRecomment}
                          ></Button>
                          <Button
                            icon={<CloseOutlined />}
                            key="delete"
                            danger
                            type="text"
                            onClick={() =>
                              handleCancelSave(recomment.recommentId)
                            }
                          ></Button>
                        </div>
                      ) : recomment && loginUser.id === recomment.writerId ? (
                        <div>
                          <Button
                            icon={<FormOutlined />}
                            key="edit"
                            htmlType="button"
                            type="primary"
                            ghost
                            onClick={() => handleEdit(recomment.recommentId)}
                          ></Button>
                          <Button
                            icon={<DeleteOutlined />}
                            key="delete"
                            htmlType="button"
                            danger
                            onClick={() =>
                              deleteRecomment(recomment.recommentId)
                            }
                          ></Button>
                        </div>
                      ) : loginUser.isAdmin === 1 ? (
                        <Button
                          icon={<DeleteOutlined />}
                          key="delete"
                          htmlType="button"
                          danger
                          onClick={() => deleteRecomment(recomment.recommentId)}
                        ></Button>
                      ) : null
                    ) : null,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <>
                        <EnterOutlined
                          style={{
                            color: "gray",
                            marginRight: "10px",
                            transform: "scaleX(-1)",
                          }}
                        />
                        {isAnonymous === 0 && recomment.writerImg ? (
                          <Avatar src={recomment.writerImg} />
                        ) : (
                          <Avatar
                            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                          />
                        )}
                      </>
                    }
                    title={
                      <div>
                        <span>
                          {isAnonymous === 1 ? "익명" : recomment.writerName}
                        </span>
                        {recomment &&
                        recomment.deletedAt === null &&
                        recomment.isModified === 0 ? (
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 300,
                              fontStyle: "italic",
                              marginLeft: "10px",
                            }}
                          >
                            {recomment.regDate}
                          </span>
                        ) : recomment &&
                          recomment.isModified === 1 &&
                          recomment.deletedAt === null ? (
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 300,
                              fontStyle: "italic",
                              marginLeft: "10px",
                            }}
                          >
                            수정됨
                          </span>
                        ) : null}
                      </div>
                    }
                    description={
                      isEdits && editRecommentId === recomment.recommentId ? (
                        <Form initialValues={{ Modify: recomment.content }}>
                          <Form.Item
                            name="Modify"
                            rules={[
                              {
                                required: true,
                                message: "댓글을 입력해주세요!",
                              },
                            ]}
                          >
                            <Input.TextArea
                              name="Modify"
                              onChange={handleUpdateeRecomment}
                              showCount
                              maxLength={200}
                              style={{ width: "700px" }}
                            />
                          </Form.Item>
                        </Form>
                      ) : recomment && recomment.deletedAt === null ? (
                        <div style={{ whiteSpace: "pre-line" }}>
                          {recomment.content}
                        </div>
                      ) : (
                        <div>삭제된 댓글입니다.</div>
                      )
                    }
                  />
                </List.Item>
              </>
            )}
          />
        </>
      ) : null}
    </div>
  );
};

export default ReCommentSection;
