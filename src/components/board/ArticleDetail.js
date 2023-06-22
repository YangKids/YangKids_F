import {
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Avatar } from "antd";
import "./BoardPage.css";
import axios from "axios";
import CommentSection from "./CommentSection";
import EditArticle from "./EditArticle";

function ArticleDetail() {
  const navigate = useNavigate();
  const articleId = useParams().articleId;

  console.log("재실행");
  const [article, setArticle] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikeCnt, setTotalLikeCnt] = useState(0);
  const [totalCommentCnt, setTotalCommentCnt] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(0);

  const [editMode, setEditMode] = useState(false);

  // 마우스 hover 적용 함수
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // 게시글 삭제하기 댓글 삭제와 방식이 다르다. 어.. 이유가..음? 뭐더라?
  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const updateArticle = await fetch(
          `http://localhost:8080/api-article/delete/${article.articleId}`,
          {
            method: "DELETE",
          }
        )
          .then((data) => {
            console.log(data);
            alert("삭제완료");
            // 경로 바꿔줘야해
            navigate("/board/freeboard");
          })
          .catch((error) =>
            console.error("게시글 삭제 중 오류가 발생했습니다: ", error)
          ); // 서버 API에 삭제 요청을 보냅니다.
      } catch (error) {
        console.error("Error fetching article:", error);
      }
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

  // 댓글 개수를 하위컴포넌트로 부터 가지고 오기 위한 함수인데 이게 처음 랜더링 될때 왜 안뜨지..?
  // 댓글 form에 뭔가를 작성해야 값이 나타나ㅎㅎㅎㅎㅎ 하하하하

  // article 수정 위한 코드, 모르게써....ㅠㅠ
  const handleUpdate = (articleId, content) => {
    console.log(articleId, content);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    // 게시글 정보를 가져오는 비동기 함수
    const fetchArticle = async () => {
      try {
        const json = await // 여기 articleId로 변수 지정 해줘야한다.
        (
          await fetch(`http://localhost:8080/api-article/detail/${articleId}`)
        ).json(); // 서버 API로부터 게시글 정보를 가져옴
        setArticle(json); // 가져온 게시글 정보를 상태 변수에 저장
        setTotalLikeCnt(json.likeCnt);
        setTotalCommentCnt(json.commentCnt);
        // 게시판 이름 설정
        if (json.boardId === 1) {
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

    setIsAnonymous(article.isAnonymous);
    axiosLike();
  }, [article]);

  if (!article) {
    return <div>Loading...</div>; // 게시글 정보가 로드되지 않은 경우 로딩 표시
  }

  return (
    <div className="BoardBox">
      <div className="ArticleBox">
        <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
          <h3 style={{ width: "150px", color: "#3BC5F9" }}>{boardName}</h3>
          <h2
            style={{
              width: "550px",
              fontWeight: "bolder",
            }}
          >
            {article.title}
          </h2>
          <div style={{ marginLeft: "100px" }}>
            <Button type="dashed" onClick={handleEdit}>
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
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: "10px" }} />
          {/*  <Avatar
               src={article.writerImg}
                /> */}
          <div style={{ flexGrow: 1, textAlign: "left" }}>
            <span style={{ fontSize: "20px", fontWeight: 500 }}>
              {isAnonymous === 0? article.writerName : "익명"}
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
            <span>
              <CommentOutlined />
              {totalCommentCnt}
            </span>
          </div>
        </div>
        <hr />
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
        {/* 넘길 데이터 지정해줘야해 articleId={article.articleId} writerId={article.writerId} */}
        <CommentSection
          articleId={articleId}
          boardId={article.boardId}
          writerId={"ssafy9yangkids"}
          commentCount={totalCommentCnt}
        />
      </div>
    </div>
  );
}

export default ArticleDetail;
