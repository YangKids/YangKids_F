import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Space,
  Switch,
  Upload,
message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPageForm = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  // console.log(loginUser)

  // useEffect(()=>{
  //   setProfileImg(loginUser.img);
  // },[])



  const myBirth = () => {
    const arr = loginUser.birth.split("")
    if(arr[0] === "0"){
      const year = "20"+arr[0]+arr[1];
      const month = arr[2]+arr[3];
      const day = arr[4]+arr[5];
      return dayjs(new Date(year,month,day))
    }else{
      const year = "19"+arr[0]+arr[1];
      const month = arr[2]+arr[3];
      const day = arr[4]+arr[5];
      return dayjs(new Date(year,month,day))
    }

  }

  const normFile = (e) => {
    console.log("Upload event:", e);

    if(e.fileList.length > 1){
      message.warning("이미지는 하나만 업로드 하세요.")
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
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      console.log(fileList);
      return false;
    },

    fileList,
    listType: "picture",
  };

  const onFinish = (profile)=>{
    const formData = new FormData();
    const dateData = profile.birth.$d;
    let year = dateData.getFullYear();
    year = String(year);
    const yy = year.substring(2,4);
    let month = String(dateData.getMonth()+1);
    let day = String(dateData.getDate());

    if(month.length === 1){
      month = "0"+month;
    }

    if(day.length === 1){
      day = "0"+day
    }

    formData.append("file", fileList[0]);

    formData.append("id", profile.id);
    formData.append("name",profile.name);
    formData.append("age" , profile.age);
    formData.append("gender", profile.gender);
    formData.append("phoneNumber", profile.phoneNumber);
    formData.append("email", profile.email);
    formData.append("teacher", profile.teacher);
    formData.append("birth", yy+month+day);
    formData.append("isEmployed", profile.isEmployed);
    formData.append("studentId", profile.studentId);
    formData.append("campus", profile.campus);


    axios
      .put("http://localhost:8080/api-user/updateUserInfo", formData, {
        header: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setFileList([]);
        message.success("프로필 수정이 완료되었습니다.");
      })  
      .catch(() => {
        message.error("프로필 수정에 실패하였습니다.");
      })
      .finally(() => {
        
        navigate(`/Mypage`)
      });


  }

  return (
    <>
      <Switch
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e)}
      >
        Form disabled
      </Switch>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={!componentDisabled}
        style={{
          maxWidth: 600,
        }}

        initialValues={{ 
          id : loginUser.id,
          name : loginUser.name,
          age : loginUser.age,
          gender : loginUser.gender,
          phoneNumber : loginUser.phoneNumber,
          email : loginUser.email,
          teacher : loginUser.teacher,
          birth : myBirth(),
          isEmployed: loginUser.isEmployed,
          studentId : loginUser.studentId,
          campus : loginUser.campus,

        }}
        onFinish={onFinish}
      >
        <Form.Item
          name = "img"
          label="프로필 사진"

          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Image src={loginUser.img? loginUser.img : "/img/bonobono.png"} width={200} />
          <br/>
          <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} style={{marginTop:"6px"}}>프로필 사진 교체</Button>
          </Upload>
        </Form.Item>



        <Form.Item name="id" label="아이디">
          <Input />
        </Form.Item>
        

        <Form.Item name ="name" label="이름">
          <Input />
        </Form.Item>

        <Form.Item name ="age" label="나이">
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="성별">
          <Radio.Group>
            <Radio value="M"> 남 </Radio>
            <Radio value="F"> 여 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="birth" label="생일">
          <DatePicker />
        </Form.Item>

        <Form.Item name="phoneNumber" label="휴대폰 번호">
          <Input />
        </Form.Item>

        <Form.Item name="email" label="이메일">
          <Input />
        </Form.Item>


        <Form.Item name="studentId" label="학번">
          <Input/>
        </Form.Item>


        <Form.Item name="teacher" label="담당 교수님">
          <Select>
            <Select.Option value="양명균">양명균</Select.Option>
            <Select.Option value="이승재">이승재</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item name="isEmployed" label="취업 여부">
          <Radio.Group>
            <Radio value={0}> 무직 </Radio>
            <Radio value={1}> 재직중 </Radio>
          </Radio.Group>
        </Form.Item>
        
        {/* <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item> */}
        {<Form.Item name="isAdmin" label="관리자 계정" valuePropName="checked">
          <Switch />
        </Form.Item>
        
        /* <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            span: 8,
            offset: 8,
          }}
        >
          <Space >
            <Button type="primary" htmlType="submit">
              수정
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default MyPageForm;
