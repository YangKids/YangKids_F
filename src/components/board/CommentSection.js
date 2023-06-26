import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Form, List, Input, Card, Space } from "antd";
import axios from "axios";
import { CommentOutlined } from "@ant-design/icons";
import RecommentSection from "./RecommentSection";
const CommentSection = ({ boardId, isAnonymous }) => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdits, setIsEdits] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [recomments, setRecomments] = useState([]);
  const [totalLikeCnt, setTotalLikeCnt] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newRecomment, setNewRecomment] = useState("");
  const [editRecomment, setEditRecomment] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");

  // 댓글 등록하기
  const createComment = async () => {
    if (!newComment || !articleId) {
      alert("댓글을 입력해주세요");
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
        data: {
          writerId: JSON.parse(sessionStorage.getItem("loginUser")).id,
          articleId: articleId,
          content: newComment,
        },
      });
      if (response.status === 201) {
        const data = response.data;
        console.log(data);
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
    axios.delete(`http://localhost:8080/api-comment/delete`, {
      params: { commentId: commentId },
    });
    // 삭제하는 코드
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
    await fetch(`http://localhost:8080/api-comment/update`, {
      method: "PUT",
      body: JSON.stringify({ commentId: editCommentId, content: editComment }),
      headers: { "Content-Type": "application/json" },
    });
    const updatedComments = comments.map((comment) =>
      comment.commentId === editCommentId
        ? { ...comment, content: editComment }
        : comment
    );
    setComments(updatedComments);
    setIsEdits(false);
    setEditComment("");
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
        console.log(json);
        setTotalLikeCnt(json.likeCnt);
      } catch (error) {
        // 댓글이 하나도 안달렸을때 에러나는데 어떻게 처리할까
      }
    };
    if (!comments) {
      return; // 댓글 내용, articleId, writerId 중 하나라도 없으면 댓글 작성을 중단
    }
    fetchComments();
  }, [articleId, newComment, editComment]);

  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  useEffect(() => {
    // if (loginUser) {
    //   setLoginUserId(JSON.parse(loginUser).id);
    // }
  }, []);

  // // 대댓글 가지고 오기 위한 비동기 함수, 이런다고 모든 대댓글을 가져올 수 있나?
  // const fetchRecomments = async (commentIds) => {
  //   try {
  //     const recommentData = await Promise.all(
  //       commentIds.map(async (commentId) => {
  //         const response = await fetch(
  //           `http://localhost:8080/api-recomment/list/${commentId}`
  //         );
  //         const json = await response.json();
  //         console.log(json);
  //         return json;
  //       })
  //     );
  //     setRecomments(recommentData);
  //     console.log(recomments);
  //   } catch (error) {
  //     // 대댓글 처리가 안된다.
  //     console.error("Error fetching recomments:", error);
  //   }
  // };

  useEffect(() => {
    const fetchCommentsAndRecomments = async () => {
      if (comments.length > 0) {
        const commentIds = comments.map((comment) => comment.commentId);
        console.log("코멘트아이디");
        console.log(commentIds);
        // await fetchRecomments(commentIds);
      }
    };

    fetchCommentsAndRecomments();
  }, []);

  const handleEdit = (commentId) => {
    setEditCommentId(commentId);
    setIsEdits(true);
  };
  const handleUpdateComment = (e) => {
    console.log(e)
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

  // // 마우스 hover 적용 함수
  // const handleMouseEnter = () => {
  //   setHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setHovered(false);
  // };

  // // likeup 위한 코드
  // const handleLike = async () => {
  //   if (!liked) {
  //     const response = await axios({
  //       method: "POST",
  //       url: `http://localhost:8080/api-commentLike/likeup`,
  //       headers: {
  //         "Content-Type": "application/json;",
  //       },
  //       data: { commentId: article.articleId, userId: article.writerId },
  //     });
  //     if (response.status === 200) {
  //       setLiked(true);
  //       setTotalLikeCnt(totalLikeCnt + 1);
  //     }
  //   }
  // };

  // // likeDown 위한 코드
  // const handleUnLike = async () => {
  //   if (liked && totalLikeCnt > 0) {
  //     const response = await axios({
  //       method: "DELETE",
  //       url: `http://localhost:8080/api-commentLike/likeDown`,
  //       headers: {
  //         "Content-Type": "application/json;",
  //       },
  //       data: { articleId: article.articleId, userId: article.writerId },
  //     });
  //     if (response.status === 200) {
  //       setLiked(false);
  //       setTotalLikeCnt(totalLikeCnt - 1);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   const axiosLike = async () => {
  //     const response = await axios({
  //       method: "POST",
  //       url: `http://localhost:8080/api-articleLike/like`,
  //       headers: {
  //         "Content-Type": "application/json;",
  //       },
  //       data: { articleId: article.articleId, userId: article.writerId },
  //     });

  //     if (response.status === 200) {
  //       if (response.data === 1) {
  //         setLiked(true);
  //       } else {
  //         setLiked(false);
  //       }
  //     }
  //   };

  //   // setIsAnonymous(article.isAnonymous);
  //   axiosLike();
  // }, []);
  // 목록가기 위한 navigate
  const navigate = useNavigate();

  const navigateToBoardList = () => {
    if (boardId === 1) {
      navigate("/Board/FreeBoard");
    } else if (boardId === 2) {
      navigate("/Board/QuestionBoard");
    } else if (boardId === 3) {
      navigate("/Board/InfoBoard");
    } else if (boardId === 4) {
      navigate("/Board/YangchelinBoard");
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
            <Form.Item style={{ marginBottom: "30px" }}>
              <Input.TextArea
                className="CommentTextBox"
                rows={4}
                placeholder="댓글을 입력하세요."
                value={newComment}
                onChange={handleCreateComment}
                style={{ resize: "none" }}
                showCount
                maxLength={200}
              />
              <Button
                type="primary"
                htmlType="submit"
                onClick={createComment}
                style={{
                  textAlign: "right",
                  marginLeft: "880px",
                  marginTop: "1.5rem",
                }}
              >
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
          <div>
          <List.Item
            actions={[
              isEdits && editCommentId === comment.commentId ? (
                // div 대신 React.Fragment 사용도 가능
                // 수정하기 버튼 눌렀을 때 나오는 부분
                <div>
                  <Button
                    key="edit"
                    htmlType="submit"
                    onClick={() => updateComment}
                  >
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
              ) : loginUserId === comment.writerId ? (
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
                  <span>{isAnonymous === 1 ? "익명" : comment.writerName}</span>
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
                  <>
                    {isDelete ? (
                      <span>삭제된 댓글입니다.</span>
                    ) : (
                      <div>{comment.content}</div>
                    )}
                    {/* <span onClick={() => handleRecomments(comment.commentId)}> */}
                    <span>reply to</span>
                  </>
                )
              }
            />
          </List.Item>
          {comment.recommentCnt>0 ? <RecommentSection/>: null} 
          </div>
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
        <Button
          type="primary"
          size={"large"}
          onClick={() => navigateToBoardList}
        >
          목록으로
        </Button>
      </Space>
    </div>
  );
};

export default CommentSection;
