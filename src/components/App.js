import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

// 모든 로직 관리(props state 포함)
function App() {
  //state 저장
  //유저의 로그인 여부 판별가능
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //로그인, 로그아웃을 확인할 시간을 주자!
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  //prop 전달
  return (
    // jsx 문법
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer> &copy; {new Date().getFullYear()} Sehee Lee</footer>
    </>
  );
}

export default App;
