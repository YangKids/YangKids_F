import { PlusOutlined } from "@ant-design/icons";
import {
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
import { useState } from "react";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const MyPageForm = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
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
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>

        <Form.Item label="아이디">
          <Input />
        </Form.Item>
        <Form.Item label="비밀번호">
          <Input />
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

        <Form.Item label="이름">
          <Input />
        </Form.Item>
        <Form.Item label="나이">
          <Input />
        </Form.Item>
        <Form.Item label="성별">
          <Radio.Group>
            <Radio value="male"> 남 </Radio>
            <Radio value="female"> 여 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="휴대폰 번호">
          <Input />
        </Form.Item>
        <Form.Item label="이메일">
          <Input />
        </Form.Item>

        <Form.Item label="담당 교수님">
          <Select>
            <Select.Option value="양명균">양명균</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="생일">
          <DatePicker />
        </Form.Item>

        <Form.Item label="취업 여부">
          <Radio.Group>
            <Radio value="employeed"> 재직중 </Radio>
            <Radio value=""> 무직 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        {/* <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item> */}
        {<Form.Item label="관리자 계정" valuePropName="checked">
          <Switch />
        </Form.Item>
        
        /* <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item> */}
      </Form>
    </>
  );
};
export default () => <MyPageForm />;
