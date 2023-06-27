import { UploadOutlined } from "@ant-design/icons";
import { Form, Radio, Select, Upload, Button, Input } from "antd";

const SignupForm2 = ({
  setTeacher,
  setCampus,
  isEmployed,
  setIsEmployed,
  fileList,
  setFileList,
  generation,
  setGeneration,
  studentId,
  setStudentId,
}) => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setTeacher(value);
  };
  const handleCampusChange = (value) => {
    console.log(`selected ${value}`);
    setCampus(value);
  };
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setIsEmployed(e.target.value);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    let fileList = e.fileList;
    fileList = fileList.slice(-1);
    // setFileList(fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },

    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    listType: "picture",
  };
  return (
    <>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="teacher"
          label="담당 교수님"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="담당 교수님을 선택하세요."
            onChange={handleChange}
            options={[
              {
                value: "양명균",
                label: "양명균",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          name="campus"
          label="캠퍼스"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="캠퍼스를 선택하세요."
            onChange={handleCampusChange}
            options={[
              {
                value: "광주",
                label: "광주",
              },
              {
                value: "구미",
                label: "구미",
              },
              {
                value: "대전",
                label: "대전",
              },
              {
                value: "부울경",
                label: "부울경",
              },
              {
                value: "서울",
                label: "서울",
              },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          name="generation"
          label="기수"
          rules={[
            {
              required: true,
              message: "SSAFY 기수를 입력해 주세요.",
            },
          ]}
        >
          <Input
            placeholder="숫자만 입력해 주세요."
            value={generation}
            onChange={(e) => setGeneration(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="studentId"
          label="학번"
          rules={[
            {
              required: true,
              message: "SSAFY 학번을 입력해 주세요.",
            },
          ]}
        >
          <Input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="isEmployed"
          label="취업 여부"
          rules={[
            {
              required: true,
              message: "취업 여부를 선택해 주세요.",
            },
          ]}
        >
          <Radio.Group onChange={onRadioChange} value={isEmployed}>
            <Radio value="1"> 재직중 </Radio>
            <Radio value="0"> 무직 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="img"
          label="프로필 사진"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm2;
