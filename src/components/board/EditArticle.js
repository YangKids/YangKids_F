import React, { useState } from "react";
import "./BoardPage.css";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
  },
};

const EditArticle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingArticle = location.state.article;
  console.log(editingArticle);

  const [isAnonymousData,setIsAnonymousData] = useState(0);

  const onFinish = (article) => {

    if(article.isAnonymous){
      setIsAnonymousData(1)
    }

    const data = {
      articleId : editingArticle.articleId,
      title : article.title,
      content : article.content,
      isAnonymous : isAnonymousData,
    };

    console.log(data)

    axios
      .put("http://localhost:8080/api-article/update", data)
      .then(() => {
        message.success("게시글 등록이 완료되었습니다.");
      })
      .catch(() => {
        message.error("게시글 등록에 실패하였습니다.");
      })
      .finally(() => {
        // navigate(`/Board/`)
        if (editingArticle.boardId === 1) {
          navigate(`/Board/FreeBoard`);
        } else if (editingArticle.boardId === 2) {
          navigate(`/Board/QuestionBoard`);
        } else if (editingArticle.boardId === 3) {
          navigate(`/Board/InfoBoard`);
        } else if (editingArticle.boardId === 4) {
          navigate(`/Board/YangchelinBoard`);
        }
      });
  };

  return (
    <div className="FormBox">
      <h3 style={{ textAlign: "center" }}>게시글 수정</h3>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          boardId: editingArticle.boardId,
          title: editingArticle.title,
          content: editingArticle.content,
          isAnonymous: editingArticle.isAnonymous,
        }}
        style={{
          maxWidth: 1200,
          paddingTop: "40px",
        }}
      >
        <Form.Item
          name="boardId"
          label="게시판"
          hasFeedback
          wrapperCol={{
            span: 4,
          }}
        >
          <Select placeholder="게시판을 선택하세요" disabled={true}>
            <Option value={0}>공지사항</Option>
            <Option value={1}>자유게시판</Option>
            <Option value={2}>질문게시판</Option>
            <Option value={3}>정보공유게시판</Option>
            <Option value={4}>양슐랭가이드</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="제목"
          rules={[
            {
              required: true,
              message: "제목을 입력하세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="content"
          label="내용"
          rules={[
            {
              required: true,
              message: "내용을 입력하세요!",
            },
          ]}
        >
          <TextArea rows={10} />
        </Form.Item>

        <Form.Item
          name="isAnonymous"
          label="익명"
          valuePropName="checked"
          initialValue
        >
          <Switch checkedChildren="익명" unCheckedChildren="실명" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 8,
            offset: 8,
          }}
        >
          <Space style={{ marginLeft: "110px" }}>
            <Button type="primary" htmlType="submit">
              등록
            </Button>
            <Button htmlType="reset">초기화</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditArticle;
