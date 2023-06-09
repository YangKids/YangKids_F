import React from "react";
import { useLocation } from "react-router";
//프롭스 받는 방법이 굉장히 번거로움.
//이것보다 조금 더 나은 방법이 있을 것 같은디
const SearchResult = () => {
    const location = useLocation();
  return (
    <div>
      <h1>검색결과</h1>
      <div>{location.state.keyowrd}</div>
    </div>
  );
};

export default SearchResult;
