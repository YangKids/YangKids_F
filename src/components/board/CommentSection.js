import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Form, List, Input, Card, Space } from "antd";
import axios from "axios";
import { CommentOutlined } from "@ant-design/icons";

const CommentSection = ({ articleId, boardId, writerId, commentCount }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdits, setIsEdits] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [editComment, setEditComment] = useState("");

  // 댓글 등록하기
  const createComment = async () => {
    if (!newComment || !articleId || !writerId) {
      return; // 댓글 내용, articleId, writerId 중 하나라도 없으면 댓글 작성을 중단
    }
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api-comment/write`,
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: { writerId: writerId, articleId: articleId, content: newComment },
      });
      if (response.status === 201) {
        const data = response.data;
        setComments([...comments, data]);
        setNewComment("");
      } else {
        console.log(response);
        throw new Error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // 댓글 삭제하기
  const deleteComment = async (commentId) => {
    await fetch(`http://localhost:8080/api-comment/delete/${commentId}`, {
      method: "DELETE",
    });
    const removeComment = comments.filter(
      (comment) => comment.commentId !== commentId
    );
    setComments(removeComment);
  };

  // 댓글 수정하기
  const updateComment = async () => {
    if (editComment === "") {
      alert("뭐라도 입력해봐봐");
      return;
    }
    const response = await fetch(`http://localhost:8080/api-comment/update`, {
      method: "PUT",
      body: JSON.stringify({ commentId: editCommentId, content: editComment }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    const updatedComments = comments.map((comment) =>
      comment.commentId === editCommentId
        ? { ...comment, content: editComment }
        : comment
    );
    setComments(updatedComments);
    setEditComment("");
    setIsEdits(false);
  };

  useEffect(() => {
    // 댓글 정보를 가져오는 비동기 함수
    const fetchComments = async () => {
      try {
        const json = await (
          await fetch(`http://localhost:8080/api-comment/list/${articleId}`)
        ).json(); // 서버 API로부터 댓글 정보를 가져옴
        // setInitLoading(false); // 필요성은?
        setComments(json); // 가져온 게시글 정보를 상태 변수에 저장
        // 상위 컴포넌트(ArticleDetail)로 댓글 개수를 올리기 위한 함수.. 근데 댓글 form에 뭔가 작성이 되어야 댓글 개수가 뜬다....으아아아아ㅇㅇ
        // commentCount(comments.length);
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };
    fetchComments();
    // commentCount(comments.length); //나도 모르겄다
  }, [articleId, newComment]);

  const handleEdit = (commentId) => {
    setEditCommentId(commentId);
    setIsEdits(true);
  };
  const handleUpdateComment = (e) => {
    setEditComment(e.target.value);
    // setIsModified(true);
  };

  const handleCreateComment = (e) => {
    setNewComment(e.target.value);
  };
  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  const handleCancelSave = () => {
    setIsEdits(false);
  };
  // 목록가기 위한 navigate
  const navigate = useNavigate();

  const navigateToBoardList = () => {
    if (boardId === 1) {
      navigate("/board/FreeBoard");
    } else if (boardId === 2) {
      navigate("/board/QuestionBoard");
    } else if (boardId === 3) {
      navigate("/board/InfoBoard");
    } else if (boardId === 4) {
      navigate("/board/YangchelinBoard");
    }
  };
  return (
    <div className="CommentBox">
      <div style={{ display: "flex" }}>
        <Card
          style={{
            backgroundColor: "#F0F1F3",
            width: "1000px",
            marginTop: "2rem",
            marginBottom: "2rem",
            height: "200px",
          }}
        >
          <Form>
            <Form.Item
              name="Comment"
              rules={[
                {
                  required: true,
                  message: "댓글을 입력해주세요!",
                },
              ]}
              style={{ marginBottom: "30px" }}
            >
              <Input.TextArea
                name="Comment"
                rows={4}
                placeholder="댓글을 입력하세요."
                value={newComment}
                onChange={handleCreateComment}
                style={{ resize: "none" }}
                showCount
                maxLength={200}
              />
            </Form.Item>
            <Form.Item
              style={{
                textAlign: "right",
                marginRight: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <Button type="primary" htmlType="submit" onClick={createComment}>
                작성
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <CommentOutlined style={{ marginRight: "3px" }} />
        <span
          style={{
            marginRight: "10px",
            fontWeight: "bolder",
            fontSize: "20px",
          }}
        >
          댓글
        </span>
        <p style={{ margin: 0, fontSize: "15px" }}>
          총 {comments.length}개의 댓글이 달림
        </p>
      </span>
      <hr />
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment, index) => (
          <List.Item
            actions={[
              isEdits && editCommentId === comment.commentId ? (
                // div 대신 React.Fragment 사용도 가능
                <div>
                  {/* 아... 암것도 수정안했을 때 수정하기 누르면 내용이 다 사라지네? */}
                  <Button key="edit" htmlType="submit" onClick={updateComment}>
                    Modify
                  </Button>
                  <Button
                    key="delete"
                    htmlType="button"
                    onClick={() => handleCancelSave(comment.commentId)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : comment.isModified !== 1 ? (
                <div>
                  <Button
                    key="edit"
                    htmlType="button"
                    type="primary"
                    ghost
                    onClick={() => handleEdit(comment.commentId)}
                  >
                    수정
                  </Button>
                  <Button
                    key="delete"
                    htmlType="button"
                    danger
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    삭제
                  </Button>
                </div>
              ) : null,
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
                  <span>{comment.writerId}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 300,
                      fontStyle: "italic",
                      marginLeft: "10px",
                    }}
                  >
                    {comment.regDate}
                  </span>
                  {comment.isModified === 1 ? (
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        marginLeft: "20px",
                      }}
                    >
                      수정됨
                    </span>
                  ) : null}
                </div>
              }
              description={
                isEdits && editCommentId === comment.commentId ? (
                  <Form initialValues={{ Modify: comment.content }}>
                    <Form.Item
                      name="Modify"
                      rules={[
                        {
                          required: true,
                          message: "수정할 댓글을 입력해주세요!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        name="Modify"
                        onChange={handleUpdateComment}
                        showCount
                        maxLength={200}
                      />
                    </Form.Item>
                  </Form>
                ) : (
                  <div>{comment.content}</div>
                )
              }
            />
          </List.Item>
        )}
      />
      <hr />
      <Space
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button type="primary" size={"large"} onClick={navigateToBoardList}>
          목록으로
        </Button>
      </Space>
    </div>
  );
};

export default CommentSection;
