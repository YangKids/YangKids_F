import Header from "../layout/header/Header";
import MyPageForm from "./MyPageForm";
import "./MyPage.css"

const MyPage = () => {
  return (
    <div className="Body">
      <Header />

      <div className="MyPageTitle">
      <i class="fa-solid fa-id-card"></i>
        <div className="ExplainText">
          마이페이지 <br />
          솔직하게 작성하도록.
        </div>
      </div>

      <div className="formBox">
        <MyPageForm></MyPageForm>
      </div>
    </div>
  );
};

export default MyPage;
