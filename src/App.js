// import React from 'react';
// import './App.css';
// import Navbar from './components/layout/header/Header';
// import FreeBoard from './components/FreeBoard';
// import Footer from './components/layout/Footer';
// import HotArticle from './components/HotArticle';
// import Quot from './components/carousel';
// import SearchBar from './components/SearchBar';
// import YangchelinGuide from './components/YangchelinGuide';

// const App = () => {
//   return (
//     <div>
//       <div className='Body'>
//         <div style={{ height: '100px', display: 'flex', justifyContent: "center", alignContent: "center" }}>
//           <Navbar />
//         </div>

//         <div className='Quotation'><Quot /></div>

//         <div className='SearchBox'><SearchBar /></div>

//         <div className='CardBox'>
//           <FreeBoard />
//           <div style={{ minWidth: '40px', height: '1410px'}}></div>
//           <HotArticle />
//         </div>

//         <div className='CardBox'>
//         <HotArticle />
//         <div style={{ minWidth: '40px', height: '1410px'}}></div>
//           <YangchelinGuide/>
//         </div>
//         <Footer />
//       </div>

//     </div>

//   )
// };
// export default App;

import React from "react";
import "./App.css";
import Navbar from "./components/layout/header/Header";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="App">
      <Navbar />
      <div className="Body">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            placeholder="이메일"
            {...register("email", { required: "이메일을 입력해주세요" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "최소 6자 이상의 비밀번호를 입력해주세요",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm")}
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
