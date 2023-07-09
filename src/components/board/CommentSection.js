import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Form, List, Input, Card, Space } from "antd";
import axios from "axios";
import {
  LikeFilled,
  LikeOutlined,
  CommentOutlined,
  DeleteOutlined,
  FormOutlined,
  ScissorOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ReCommentSection from "./ReCommentSection";
import ReCommentInput from "./ReCommentInput";
import Swal from "sweetalert2";

const CommentSection = ({ boardId, isAnonymous, loginUser }) => {
  const { articleId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdits, setIsEdits] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [likeArray, setLikeArray] = useState([]);
  const [totalLikeCnt, setTotalLikeCnt] = useState([]);
  const [totalRecommentCnt, setTotalRecommentCnt] = useState(0);
  const [createRecomment, setCreateRecomment] = useState(false);
  const [createCommentId, setCreateCommentId] = useState(0);

  const [reload, setReload] = useState(false);

  const readyForReload = () => {
    setReload(!reload);
  };
  // console.log("코멘트섹션에서의 reload", reload);

  // 댓글 정보 전체 가져오기
  const fetchComments = async () => {
    try {
      const json = await (
        await fetch(`http://localhost:8080/api-comment/list/${articleId}`)
      ).json(); // 서버 API로부터 댓글 정보를 가져옴
      setComments(json); // 가져온 게시글 정보를 상태 변수에 저장
      let recommentCntTotal = 0;
      for (let i = 0; i < json.length; i++) {
        recommentCntTotal += json[i].recommentCnt;
      }
      setTotalRecommentCnt(recommentCntTotal);
    } catch (error) {
      setComments([]);
    }
  };

  // 댓글 등록하기
  const createComment = async () => {
    if (!newComment || !articleId || !loginUser) {
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
          Swal.fire("댓글이 등록되었습니다!", "", "success");
          setComments([...comments, data]);
          setNewComment("");
        } else {
          throw new Error("Failed to create comment");
        }
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "등록에 실패했습니다. 다시 시도해보세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // 댓글 삭제
  const deleteComment = async (commentId) => {
    try {
      const result = await Swal.fire({
        title: "댓글을 삭제하시겠습니까?",
        text: "삭제 후에는 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        allowOutsideClick: () => !Swal.isLoading(),
      });
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:8080/api-comment/delete`,
          {
            params: { commentId: commentId },
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
          fetchComments();
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

  // 댓글 수정하기
  const updateComment = async () => {
    if (editComment === "") {
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
        await fetch(`http://localhost:8080/api-comment/update`, {
          method: "PUT",
          body: JSON.stringify({
            commentId: editCommentId,
            content: editComment,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const updatedComments = comments.map((comment) =>
          comment.commentId === editCommentId
            ? { ...comment, content: editComment }
            : comment
        );
        Swal.fire("댓글이 수정되었습니다!", "", "success");
        setComments(updatedComments);
        setIsEdits(false);
        setEditComment("");
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

  // 좋아요 버튼 누를때마다 자동으로 갯수 counting 되도록 비동기적 처리 위한 likeCnt 설정
  const totalLikeCntTest = useCallback(
    () => comments.map((comment) => comment.likeCnt),
    [comments]
  );

  // likeCnt 비동기적으로 처리
  useEffect(() => {
    const totalLikeCnt = totalLikeCntTest();
    setTotalLikeCnt(totalLikeCnt);
  }, [totalLikeCntTest]);

  // 현재 loginUser가 좋아요 되어있는지 확인하기 위함
  useEffect(() => {
    const commentId = comments.map((comment) => comment.commentId);

    const axiosLike = async () => {
      const promises = commentId.map((id) =>
        axios({
          method: "POST",
          url: `http://localhost:8080/api-commentLike/like`,
          headers: {
            "Content-Type": "application/json;",
          },
          data: { commentId: id, userId: loginUser.id },
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
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api-commentLike/likeup`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: {
          commentId: commentId,
          userId: loginUser.id,
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
    if (totalLikeCnt[index] > 0) {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:8080/api-commentLike/likeDown`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: { commentId: commentId, userId: loginUser.id },
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
    setEditCommentId(commentId);
    setIsEdits(true);
  };
  const handleUpdateComment = (e) => {
    setEditComment(e.target.value);
  };

  const handleCreateComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleCancelSave = () => {
    setIsEdits(false);
  };

  const handleRecomments = (commentId) => {
    setCreateRecomment(!createRecomment);
    if (createCommentId === 0) {
      setCreateCommentId(commentId);
    } else {
      setCreateCommentId(0);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId, newComment, editComment, reload]);

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
          총 {totalRecommentCnt + comments.length}개의 댓글이 달림
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
              comment && comment.deletedAt === null ? (
                isEdits && editCommentId === comment.commentId ? (
                  <div>
                    <Button
                      icon={<ScissorOutlined />}
                      key="edit"
                      type="text"
                      onClick={updateComment}
                    ></Button>
                    <Button
                      icon={<CloseOutlined />}
                      key="delete"
                      danger
                      type="text"
                      onClick={() => handleCancelSave(comment.commentId)}
                    ></Button>
                  </div>
                ) : comment && loginUser.id === comment.writerId ? (
                  <>
                    <Button
                      icon={<FormOutlined />}
                      key="edit"
                      htmlType="button"
                      type="primary"
                      ghost
                      onClick={() => handleEdit(comment.commentId)}
                    ></Button>
                    <Button
                      icon={<DeleteOutlined />}
                      key="delete"
                      htmlType="button"
                      danger
                      onClick={() => deleteComment(comment.commentId)}
                    ></Button>
                  </>
                ) : loginUser.isAdmin === 1 ? (
                  <Button
                    icon={<DeleteOutlined />}
                    key="delete"
                    htmlType="button"
                    danger
                    onClick={() => deleteComment(comment.commentId)}
                  ></Button>
                ) : null
              ) : null,
            ]}
          >
            <List.Item.Meta
              avatar={
                comment && comment.writerImg && isAnonymous === 0 ? (
                  <Avatar src={comment.writerImg} />
                ) : (
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                )
              }
              title={
                <div>
                  <span>{isAnonymous === 1 ? "익명" : comment.writerName}</span>
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
                    ) : (
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
                    )
                  ) : null}
                </div>
              }
              description={
                comment && isEdits && editCommentId === comment.commentId ? (
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
                          style={{ width: "850px" }}
                        />
                      </Form.Item>
                    </Form>
                    <div>
                      {comment.recommentCnt > 0 ? (
                        <p style={{ color: "blue", marginBottom: "5px" }}>
                          답글 {comment.recommentCnt}개
                        </p>
                      ) : null}
                      <ReCommentSection
                        commentIds={comment.commentId}
                        isAnonymous={comment.isAnonymous}
                        loginUser={loginUser}
                        reload={reload}
                      />
                    </div>
                  </>
                ) : comment && comment.deletedAt === null ? (
                  <React.Fragment>
                    <div style={{ whiteSpace: "pre-line" }}>
                      {comment.content}
                    </div>
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
                      {createRecomment &&
                      comment.commentId === createCommentId ? (
                        <Button
                          onClick={() => handleRecomments(comment.commentId)}
                          style={{
                            fontWeight: 300,
                            fontStyle: "italic",
                            marginLeft: "10px",
                          }}
                          size={"small"}
                        >
                          취소
                        </Button>
                      ) : (
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
                      )}
                      {createRecomment &&
                      comment.commentId === createCommentId ? (
                        <ReCommentInput
                          commentId={comment.commentId}
                          isAnonymous={isAnonymous}
                          loginUser={loginUser}
                          clickCreateRecomment={createRecomment}
                          createRecommentId={createCommentId}
                          readyForReload={readyForReload}
                          handleRecomments={handleRecomments}
                        />
                      ) : null}
                      {comment.recommentCnt > 0 ? (
                        <div>
                          <p style={{ color: "blue" }}>
                            답글 {comment.recommentCnt}개
                          </p>

                          <ReCommentSection
                            commentIds={comment.commentId}
                            isAnonymous={isAnonymous}
                            reload={reload}
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
          onClick={() => navigateToBoardList()}
        >
          목록으로
        </Button>
      </Space>
    </div>
  );
};

export default CommentSection;
