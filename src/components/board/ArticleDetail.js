import { HeartOutlined, HeartFilled, EyeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Avatar, Image } from "antd";
import "./BoardPage.css";
import axios from "axios";
import CommentSection from "./CommentSection";
import Swal from "sweetalert2";

const ArticleDetail = () => {
  const navigate = useNavigate();
  const articleId = useParams().articleId;
  const [article, setArticle] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikeCnt, setTotalLikeCnt] = useState(0);
  const [visible, setVisible] = useState(false);

  // 마우스 hover 적용 함수
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // 현재 로그인한 유저 가져오가
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));

  // 게시글 삭제하기
  const handleDelete = async (articleId) => {
    try {
      const result = await Swal.fire({
        title: "게시글을 삭제하시겠습니까?",
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
        try {
          await axios({
            method: "DELETE",
            url: `http://localhost:8080/api-article/delete`,
            params: { articleId: articleId },
          })
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "게시글이 삭제되었습니다.",
                showConfirmButton: false,
                timer: 1000,
              });
              // 게시판 이름 설정
              if (article.boardId === 0) {
                navigate("/Board/NoticeBoard");
              } else if (article.boardId === 1) {
                navigate("/Board/FreeBoard");
              } else if (article.boardId === 2) {
                navigate("/Board/QuestionBoard");
              } else if (article.boardId === 3) {
                navigate("/Board/InfoBoard");
              } else {
                navigate("/Board/YangchelinBoard");
              }
            })
            .catch
            // console.error("게시글 삭제 중 오류가 발생했습니다: ", error)
            (); // 서버 API에 삭제 요청을 보냅니다.
        } catch (error) {
          // console.error("Error fetching article:", error);
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

  // likeup 위한 코드
  const handleLike = async () => {
    if (!liked) {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api-articleLike/likeup`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: { articleId: article.articleId, userId: article.writerId },
      });
      if (response.status === 200) {
        setLiked(true);
        setTotalLikeCnt(totalLikeCnt + 1);
      }
    }
  };

  // likeDown 위한 코드
  const handleUnLike = async () => {
    if (liked && totalLikeCnt > 0) {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:8080/api-articleLike/likeDown`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: { articleId: article.articleId, userId: article.writerId },
      });
      if (response.status === 200) {
        setLiked(false);
        setTotalLikeCnt(totalLikeCnt - 1);
      }
    }
  };

  useEffect(() => {
    // 게시글 정보를 가져오는 비동기 함수
    const fetchArticle = async () => {
      try {
        const json = await (
          await fetch(`http://localhost:8080/api-article/detail/${articleId}`)
        ).json(); // 서버 API로부터 게시글 정보를 가져옴
        setArticle(json); // 가져온 게시글 정보를 상태 변수에 저장
        setTotalLikeCnt(json.likeCnt);
        // 게시판 이름 설정
        if (json.boardId === 0) {
          setBoardName("공지사항");
        } else if (json.boardId === 1) {
          setBoardName("자유게시판");
        } else if (json.boardId === 2) {
          setBoardName("질문게시판");
        } else if (json.boardId === 3) {
          setBoardName("정보공유게시판");
        } else {
          setBoardName("양슐랭가이드");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    // 게시글 정보를 가져오는 비동기 함수 호출
    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    const axiosLike = async () => {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8080/api-articleLike/like`,
        headers: {
          "Content-Type": "application/json;",
        },
        data: { articleId: article.articleId, userId: article.writerId },
      });

      if (response.status === 200) {
        if (response.data === 1) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    };
    axiosLike();
  }, [article]);

  if (!article) {
    return <div>Loading...</div>; // 게시글 정보가 로드되지 않은 경우 로딩 표시
  }

  return (
    <div className="BoardBox">
      <div className="ArticleBox">
        <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
          <h5 style={{ width: "150px", color: "#3BC5F9" }}>{boardName}</h5>
          {article && article.title && (
            <>
              {article.title.length > 23 ? (
                <h4
                  style={{
                    width: "550px",
                    fontWeight: "bold",
                  }}
                >
                  {article.title}
                </h4>
              ) : (
                <h3
                  style={{
                    width: "550px",
                    fontWeight: "bold",
                  }}
                >
                  {article.title}
                </h3>
              )}
            </>
          )}
          {article.writerId === loginUser.id ? (
            <div style={{ marginLeft: "100px" }}>
              <Button
                type="dashed"
                onClick={() =>
                  navigate("/Board/Edit", {
                    state: { article: article },
                  })
                }
              >
                수정하기
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(article.articleId)}
              >
                삭제하기
              </Button>
            </div>
          ) : loginUser.isAdmin === 1 ? (
            <div style={{ marginLeft: "200px" }}>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(article.articleId)}
              >
                삭제하기
              </Button>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {article.boardId === 0 ? (
            <Avatar src={`../img/admin.png`} style={{ marginRight: "10px" }} />
          ) : article.isAnonymous === 0 ? (
            <Avatar src={article.writerImg} style={{ marginRight: "10px" }} />
          ) : (
            <Avatar
              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${article.articleId}`}
              style={{ marginRight: "10px" }}
            />
          )}
          <div style={{ flexGrow: 1, textAlign: "left" }}>
            <span style={{ fontSize: "18px", fontWeight: 500 }}>
              {article.boardId === 0
                ? "관리자"
                : article.isAnonymous === 0
                ? article.writerName
                : "익명"}
            </span>
            {article.regDate !== article.updateDate ? (
              <React.Fragment>
                <p
                  style={{
                    marginTop: "0px",
                    fontSize: "13px",
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {article.updateDate}
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 300,
                      marginLeft: "20px",
                    }}
                  >
                    수정됨
                  </span>
                </p>
              </React.Fragment>
            ) : (
              <p
                style={{
                  marginTop: "0px",
                  fontSize: "13px",
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                {article.regDate}
              </p>
            )}
          </div>
          <div className="ViewLikeCommentCnt">
            <span>
              <EyeOutlined />
              {article.viewCnt}
            </span>
            <span>
              {liked ? <HeartFilled /> : <HeartOutlined />}
              {totalLikeCnt}
            </span>
          </div>
        </div>
        <hr />
        {article.img ? (
          <React.Fragment>
            <Image
              className="imageArea"
              preview={{
                visible: false,
              }}
              width={400}
              src={article.img}
              onClick={() => setVisible(true)}
            />
            <div
              style={{
                display: "none",
              }}
            >
              <Image.PreviewGroup
                preview={{
                  visible,
                  onVisibleChange: (vis) => setVisible(vis),
                }}
              >
                <Image src={article.img} />
              </Image.PreviewGroup>
            </div>
          </React.Fragment>
        ) : null}
        <div className="articleContent">{article.content}</div>
        <hr />
        <div
          style={{
            display: "flex",
            marginTop: "1rem",
            justifyContent: "center",
          }}
        >
          <Button
            size={"large"}
            danger
            onClick={liked ? handleUnLike : handleLike}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
          >
            {(!liked && hovered) || liked ? <HeartFilled /> : <HeartOutlined />}
            좋아요
          </Button>
        </div>
      </div>
      <div className="CommentBox">
        <CommentSection
          boardId={article.boardId}
          isAnonymous={article.isAnonymous}
          loginUser={loginUser}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
