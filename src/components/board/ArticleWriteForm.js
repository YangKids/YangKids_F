import { useEffect, useState } from "react";
// import "./BoardPage.css"
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
  },
};

const ArticleWirteForm = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isAnonymousData, setIsAnonymousData] = useState(0);
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem("loginUser")));
  }, []);

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (e.fileList.length > 1) {
      Swal.fire({
        icon: "warning",
        title: "사진은 하나만 등록 가능합니다.",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    let fileList = e.fileList;
    fileList = fileList.slice(-1);

    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      console.log(index)
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      console.log("onremove", fileList)
    },

    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      console.log(fileList);
      return false;
    },

    fileList,
    listType: "picture",
  };

  const onFinish = (article) => {
    if (fileList.length > 0) {
      const formData = new FormData();
      console.log(fileList);
      formData.append("file", fileList[fileList.length-1]);
      formData.append("boardId", article.boardId);
      formData.append(
        "writerId",
        JSON.parse(sessionStorage.getItem("loginUser")).id
      );
      formData.append("title", article.title);
      formData.append("content", article.content);

      if (article.isAnonymous) {
        formData.append("isAnonymous", 1);
      } else {
        formData.append("isAnonymous", 0);
      }

      if (article.boardId === 0) {
        formData.append("isAdmin", 1);
      }

      axios
        .post("http://localhost:8080/api-article/writewithimg", formData, {
          header: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setFileList([]);
          Swal.fire({
            icon: "success",
            iconColor: "#80b463",
            title: "게시글 등록 완료",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "warning",
            title: "게시글 등록 실패",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          if (location.state.boardId === 0) {
            navigate(`/Board/NoticeBoard`);
          } else if (location.state.boardId === 1) {
            navigate(`/Board/FreeBoard`);
          } else if (location.state.boardId === 2) {
            navigate(`/Board/QuestionBoard`);
          } else if (location.state.boardId === 3) {
            navigate(`/Board/InfoBoard`);
          } else if (location.state.boardId === 4) {
            navigate(`/Board/YangchelinBoard`);
          }
        });
    } else {
      if (article.isAnonymous) {
        setIsAnonymousData(1);
      }

      const data = {
        boardId: article.boardId,
        writerId: JSON.parse(sessionStorage.getItem("loginUser")).id,
        title: article.title,
        content: article.content,
        isAnonymous: isAnonymousData,
      };

      console.log(data);

      axios
        .post(
          "http://localhost:8080/api-article/write",
          new URLSearchParams(data)
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            iconColor: "#80b463",
            title: "게시글 등록 완료",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "warning",
            title: "게시글 등록 실패",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          // navigate(`/Board/`)
          if (location.state.boardId === 0) {
            navigate(`/Board/NoticeBoard`);
          } else if (location.state.boardId === 1) {
            navigate(`/Board/FreeBoard`);
          } else if (location.state.boardId === 2) {
            navigate(`/Board/QuestionBoard`);
          } else if (location.state.boardId === 3) {
            navigate(`/Board/InfoBoard`);
          } else if (location.state.boardId === 4) {
            navigate(`/Board/YangchelinBoard`);
          }
        });
    }
  };

  const location = useLocation();

  return (
    <div className="FormBox">
      <h3 style={{ textAlign: "center" }}>게시글 등록</h3>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          boardId: location.state.boardId,
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
          rules={[
            {
              required: true,
              message: "글을 게시할 게시판을 선택하세요!",
            },
          ]}
        >
          <Select placeholder="게시판을 선택하세요">
            {loginUser ? (
              loginUser.isAdmin === 1 ? (
                <Option value={0}>공지사항</Option>
              ) : null
            ) : null}
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
          <Input style={{ borderRadius: "6px" }} />
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
          <TextArea rows={10} style={{ borderRadius: "6px" }} />
        </Form.Item>
        {location.state.boardId === 0 ? null : (
          <Form.Item
            name="isAnonymous"
            label="익명"
            valuePropName="checked"
            initialValue
          >
            <Switch checkedChildren="익명" unCheckedChildren="실명" />
          </Form.Item>
        )}

        <Form.Item
          name="img"
          label="이미지"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra={fileList.length > 0 ? "" : "사진을 업로드 하세요"}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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

export default ArticleWirteForm;
