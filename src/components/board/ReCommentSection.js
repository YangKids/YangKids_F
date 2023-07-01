import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Form, List, Input } from "antd";

const ReCommentSection = ({
  commentIds,
  isAnonymous,
  loginUser,
  clickCreateRecomment,
  createRecommentId,
}) => {
  const [recomments, setRecomments] = useState([]);
  const [newReComment, setNewReComment] = useState("");

  useEffect(() => {
    console.log("대댓글 정보 가져오기");
    // 댓글 정보를 가져오는 비동기 함수
    const fetchComments = async () => {
      try {
        const json = await (
          await fetch(`http://localhost:8080/api-recomment/list/${commentIds}`)
        ).json(); // 서버 API로부터 댓글 정보를 가져옴
        setRecomments(json); // 가져온 게시글 정보를 상태 변수에 저장
      } catch (error) {
        setRecomments([]);
      }
    };
    fetchComments();
  }, [commentIds]);

  const handleCreateRecomment = (e) => {
    setNewReComment(e.target.value);
  };
  // 댓글 등록하기
  const clickRecomment = async () => {
    console.log("댓글 등록하기");
    if (!newReComment) {
      alert("댓글을 입력해주세요");
      return;
    }
    try {
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
        console.log(data);
        setRecomments([...recomments, data]);
        setNewReComment("");
      } else {
        console.log(response);
        throw new Error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="CommentBox">
      <List
        itemLayout="horizontal"
        dataSource={recomments}
        renderItem={(recomment, index) => (
          <List.Item
            actions={[
              clickCreateRecomment &&
              createRecommentId === recomment.commentId ? (
                <div>
                  <Button htmlType="submit" onClick={clickRecomment}>
                    등록
                  </Button>
                  {/* <Button key="edit" htmlType="submit" onClick={}>
                    Modify
                  </Button>
                  <Button
                    key="delete"
                    htmlType="button"
                    onClick={() => handleCancelSave(comment.commentId)}
                  >
                    Cancel
                  </Button> */}
                </div>
              ) : null,
              // clickCreateRecomment && editCommentId === comment.commentId ? (
              //   // div 대신 React.Fragment 사용도 가능
              //   // 수정하기 버튼 눌렀을 때 나오는 부분
              //   <div>
              //     <Button key="edit" htmlType="submit" onClick={updateComment}>
              //       Modify
              //     </Button>
              //     <Button
              //       key="delete"
              //       htmlType="button"
              //       onClick={() => handleCancelSave(recomment.recommentId)}
              //     >
              //       Cancel
              //     </Button>
              //   </div>
              // ) : loginUser === comment.writerId ? (
              //   <div>
              //     <Button
              //       key="edit"
              //       htmlType="button"
              //       type="primary"
              //       ghost
              //       onClick={() => handleEdit(comment.commentId)}
              //     >
              //       수정
              //     </Button>
              //     <Button
              //       key="delete"
              //       htmlType="button"
              //       danger
              //       onClick={() => handleDeleteComment(comment.commentId)}
              //     >
              //       삭제
              //     </Button>
              //   </div>
              // ) : null,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                />
              }
              title={
                <div>
                  <span>
                    {isAnonymous === 1 ? "익명" : recomment.writerName}
                  </span>
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
                </div>
              }
              description={
                clickCreateRecomment &&
                createRecommentId === recomment.commentId ? (
                  <Form>
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
                        onChange={handleCreateRecomment}
                        showCount
                        maxLength={200}
                      />
                    </Form.Item>
                  </Form>
                ) : (
                  // 수정이 필요해요.
                  <div>{recomment.content}</div>
                )
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReCommentSection;
