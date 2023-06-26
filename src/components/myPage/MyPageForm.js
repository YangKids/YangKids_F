import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const MyPageForm = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [myGender, setMyGender] = useState("male")
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  console.log(loginUser)

  useEffect(()=>{
    if(loginUser.gender === "F"){
      setMyGender("female");
    }
  },[loginUser.gender])
  console.log("왜?"+myGender)


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

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}

        initialValues={{ 
          id : loginUser.id,
          name : loginUser.name,
          age : loginUser.age,
          gender : myGender,
          phoneNumber : loginUser.phoneNumber,
          email : loginUser.email,
          teacher : loginUser.teacher,
          birth : myBirth(),
          isEmployeed: loginUser.isEmployed,
          studentId : loginUser.studentId,

          campus : loginUser.campus,

        }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>


        <Form.Item
          label="프로필 사진"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
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
            <Radio value="male"> 남 </Radio>
            <Radio value="female"> 여 </Radio>
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


        <Form.Item name="isEmployeed" label="취업 여부">
          <Radio.Group>
            <Radio value={1}> 재직중 </Radio>
            <Radio value={0}> 무직 </Radio>
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
        <Button>수정</Button>
      </Form>
    </>
  );
};
export default () => <MyPageForm />;
