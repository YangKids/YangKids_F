
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Form, List, Input, Card, Space } from "antd";
import axios from "axios";
import { LikeFilled, LikeOutlined, CommentOutlined } from "@ant-design/icons";
import ReCommentSection from "./ReCommentSection";

const CommentSection = ({ boardId, isAnonymous, loginUser }) => {
  // console.log("안녕? 렌더링 폭발?");
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdits, setIsEdits] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [likeArray, setLikeArray] = useState([]);
  const [totalLikeCnt, setTotalLikeCnt] = useState([]);
  const [createRecomment, setCreateRecomment] = useState(false);
  const [createCommentId, setCreateCommentId] = useState(0);

  // 댓글 정보 전체 가져오기
  const fetchComments = async () => {
    // console.log("fetchComments");
    try {
      const json = await (
        await fetch(`http://localhost:8080/api-comment/list/${articleId}`)
      ).json(); // 서버 API로부터 댓글 정보를 가져옴
      setComments(json); // 가져온 게시글 정보를 상태 변수에 저장
    } catch (error) {
      // 댓글이 하나도 안달렸을때 에러나는데 어떻게 처리할까 그냥 빈배열로 해
      setComments([]);
    }
  };

  // 댓글 등록하기
  const createComment = async () => {
    // console.log("createComment");
    if (!newComment || !articleId || !loginUser) {
      alert("댓글을 입력해주세요");
      return;
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
        // console.log(response);
        throw new Error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {

    // console.log("deleteComment");
    const response = await axios.delete(
      `http://localhost:8080/api-comment/delete`,
      {
        params: { commentId: commentId },
      }
    );
    if (response.data === "SUCCESS") {
      fetchComments();
    }
  };

  // 댓글 수정하기
  const updateComment = async () => {
    // console.log("updateComment");
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

  // 좋아요 버튼 누를때마다 자동으로 갯수 counting 되도록 비동기적 처리 위한 likeCnt 설정
  const totalLikeCntTest = useCallback(
    () => comments.map((comment) => comment.likeCnt),
    [comments]
  );

  // likeCnt 비동기적으로 처리
  useEffect(() => {
    // console.log("useEffect - totalLikeCntTest");
    const totalLikeCnt = totalLikeCntTest();
    setTotalLikeCnt(totalLikeCnt);
  }, [totalLikeCntTest]);

  // 현재 loginUser가 좋아요 되어있는지 확인하기 위함
  useEffect(() => {
    // console.log("useEffect - check Like");
    const commentId = comments.map((comment) => comment.commentId);

    const axiosLike = async () => {
      const promises = commentId.map((id) =>
        axios({
          method: "POST",
          url: `http://localhost:8080/api-commentLike/like`,
          headers: {
            "Content-Type": "application/json;",
          },
          data: { commentId: id, userId: loginUser },
        })
      );
      // 비동기 작업 완료될때까지 대기, 요청 성공하면 요청 응답 담은 배열 반환
      const responses = await Promise.all(promises);

      const updatedLikeArray = responses.map((response) => {
        if (response.status === 200 && response.data === 1) {
          return true;
        } else if (response.status === 200 && response.data !== 1) {
          return false;
        } else {
          return false;
        }
      });
      setLikeArray(updatedLikeArray);
    };

    axiosLike();
  }, [comments, loginUser]);

  // likeup 위한 코드
  const handleLike = async (commentId, index) => {
    // console.log("handleLike");
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api-commentLike/likeup`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: {
          commentId: commentId,
          userId: loginUser,
        },
      });
      if (response.status === 200) {
        setLikeArray((prevArray) => {
          const newArray = [...prevArray];
          newArray[index] = true;
          return newArray;
        });
        setTotalLikeCnt((prevArray) => {
          const newArray = [...prevArray];
          newArray[index] = prevArray[index] + 1;
          return newArray;
        });
      }
    } catch (error) {
      // console.log("Error axios likeup:", error);
    }
  };

  // likeDown 위한 코드
  const handleUnLike = async (commentId, index) => {
    // console.log("handleUnLike");
    if (totalLikeCnt[index] > 0) {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:8080/api-commentLike/likeDown`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: { commentId: commentId, userId: loginUser },
      });
      if (response.status === 200) {
        setLikeArray((prevArray) => {
          const newArray = [...prevArray];
          newArray[index] = false;
          return newArray;
        });
        setTotalLikeCnt((prevArray) => {
          const newArray = [...prevArray];
          newArray[index] = prevArray[index] - 1;
          return newArray;
        });
      }
    }
  };

  const handleEdit = (commentId) => {
    // console.log("handleEdit");
    setEditCommentId(commentId);
    setIsEdits(true);
  };
  const handleUpdateComment = (e) => {
    // console.log("handleUpdateComment");
    setEditComment(e.target.value);
  };

  const handleCreateComment = (e) => {
    // console.log("handleCreateComment");
    setNewComment(e.target.value);
  };

  const handleCancelSave = () => {
    // console.log("handleCancelSave");
    setIsEdits(false);
  };
  const handleRecomments = (commentId) => {
    // console.log("handleRecomments");
    setCreateRecomment(true);
    setCreateCommentId(commentId);
  };

  useEffect(() => {
    // console.log("useEffect - fetchComments");
    fetchComments();
  }, [articleId, newComment, editComment]);
  // 목록가기 위한 navigate
  const navigate = useNavigate();

  const navigateToBoardList = () => {
    // console.log("목록가는 네비");
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
            backgroundColor: "#f8f9fa",
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
              comment.deletedAt === null ? (
                isEdits && editCommentId === comment.commentId ? (
                  // div 대신 React.Fragment 사용도 가능
                  // 수정하기 버튼 눌렀을 때 나오는 부분
                  <div style={{ marginBottom: "90px" }}>
                    <Button
                      key="edit"
                      htmlType="submit"
                      onClick={updateComment}
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
                ) : loginUser === comment.writerId ? (
                  comment.recommentCnt > 0 ? (
                    <div style={{ marginBottom: "130px" }}>
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
                        onClick={() => deleteComment(comment.commentId)}
                      >
                        삭제
                      </Button>
                    </div>
                  ) : (
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
                        onClick={() => deleteComment(comment.commentId)}
                      >
                        삭제
                      </Button>
                    </div>
                  )
                ) : null
              ) : null,
            ]}
          >
            <List.Item.Meta
              avatar={
                comment.writerImg === null ? (
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                ) : (
                  <Avatar src={comment.writerImg} />
                )
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
                  {comment.deletedAt === null ? (
                    comment.isModified === 1 ? (
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 400,
                          marginLeft: "20px",
                        }}
                      >
                        수정됨
                      </span>
                    ) : null
                  ) : null}
                </div>
              }
              description={
                isEdits && editCommentId === comment.commentId ? (
                  <>
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
                    <div>
                      <p style={{ color: "blue", marginBottom: "5px" }}>
                        답글 {comment.recommentCnt}개
                      </p>
                      <ReCommentSection
                        commentIds={comment.commentId}
                        isAnonymous={comment.isAnonymous}
                        loginUser={loginUser}
                        clickCreateRecomment={createRecomment}
                        createRecommentId={createCommentId}
                      />
                    </div>
                  </>
                ) : comment.deletedAt === null ? (
                  <React.Fragment>
                    <div>{comment.content}</div>
                    <div style={{ marginTop: "5px" }}>
                      <span
                        onClick={
                          likeArray[index]
                            ? () => handleUnLike(comment.commentId, index)
                            : () => handleLike(comment.commentId, index)
                        }
                      >
                        {likeArray[index] ? <LikeFilled /> : <LikeOutlined />}
                      </span>
                      <span
                        style={{
                          fontWeight: 550,
                          fontSize: "13px",
                          marginLeft: "5px",
                        }}
                      >
                        좋아요 {totalLikeCnt[index]}
                      </span>
                      <Button
                        onClick={() => handleRecomments(comment.commentId)}
                        style={{
                          fontWeight: 300,
                          fontStyle: "italic",
                          marginLeft: "10px",
                        }}
                        size={"small"}
                      >
                        답글 작성
                      </Button>
                      {comment.recommentCnt > 0 ? (
                        <div>
                          <p style={{ color: "blue" }}>
                            답글 {comment.recommentCnt}개
                          </p>
                          <ReCommentSection
                            commentIds={comment.commentId}
                            isAnonymous={comment.isAnonymous}
                            loginUser={loginUser}
                            clickCreateRecomment={createRecomment}
                            createRecommentId={createCommentId}
                          />
                        </div>
                      ) : null}
                    </div>
                  </React.Fragment>
                ) : (
                  <div>삭제된 댓글입니다.</div>
                )
              }
            />
          </List.Item>
          {/* {comment.recommentCnt>0 ? <ReCommentSection/>: null}  */}
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
