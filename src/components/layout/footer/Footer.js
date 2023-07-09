import "./Footer.css";
import { Button, Modal } from "antd";
import { useState } from "react";

const info = () => {
  Modal.info({
    title: "개발자 정보",
    content: (
      <div>
        <p>김민식</p>
        <p>김지원</p>
        <p>김한나</p>
        <p>이경호</p>
        <p>정재웅</p>
        <p>허유정</p>
      </div>
    ),
    onOk() {},
  });
};

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Footer" onClick={info}>
      문의, 제안 : ssafy9yangkids@gmail.com / 개발자 정보 <br />@ Yangkids. All
      rights reserved.
    </div>
  );
};

export default Footer;
