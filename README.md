# 프론트 작업 시작시 체크할 부분들!

프레임워크 : React
CSS 프레임워크 : Ant Design

## 실행 순서

1. vscode 상단 terminal 탭의 new terminal 실행
2. npm install
3. npm start

## and design 사용법
참고 블로그 : https://studioplug.tistory.com/375

1. npm install antd
   이거하나면 대충 다 깔림.

2. 예시
   import { Button, Tooltip } from "antd";
   
   컴포넌트, 레이아웃 등 가져올때 임포트 방식
   
   import { FilterOutlined } from "@ant-design/icons"
   
   아이콘은 이런식으로.

3. 가져온 컴포넌트 스타일 바꾸고 싶을 때
   npm install styled-components 
   
   import styled from "styled-components"

   import { 뭐시기 } from "antd";

    export default function App() {
    
      return (
      
          <스타일먹인 뭐시기 />
          
        );
        
    }


    const 스타일먹인 뭐시기 = styled(뭐시기)`
    
        color : 빨강빨강;
       
        background-color : 초록초록;
        
      `;
     
     백틱까먹지말기.
      


## 규칙 참고 자료

*폰트 사이즈는 수정 들어갈 예정
### 파일 구성 규칙.
1. 모든 컴포넌트는 components 폴더에 넣기, 이미지는 public 폴더 내부 img 폴더
2. 레이아웃에는 모든 페이지에 들어갈 컴포넌트 넣을 예정.
3. 각 컴포넌트 내부에만 사용되는 하위 컴포넌트가 많을 시 폴더 제작 예정.
4. 모든 js, css 파일은 파스칼케이스로 제작 예정. 현재 css들은 수정 필요.
5. css는 폴더명이나 적용되는 js 파일 이름과 동일.
6. 컴포넌트명은 상위 컴포넌트와 연결이 쉽도록 제작 필요. 또한 현재 수정 필요.


### 디자인 규칙(다른 페이지에서 쓰일만한 것들)
0. 화면 크기 달라지면 레이아웃 다깨짐. 엥간하면 생각하면서 제작하는 것 추천.
   그냥 100%고정으로 나처럼 만들다가는 나중에 사이즈별로 css 다시 만들어야하는 경우가 생김.
1. 대부분의 컴포넌트는 display : flex로 제작 
2. 컴포넌트 간 마진 40px
3. 카드 그림자 수치 : box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
4. 게시판 카드 내부 패딩 25px
5. 인풋 높이 40px




<!-- In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
