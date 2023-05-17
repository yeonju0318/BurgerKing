import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirection() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/kakao?code=${code}`, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((r) => {
        console.log(r);

        localStorage.setItem("name", r.data.user_name);
        alert("로그인 성공");
        navigate("/");
      });
  }, []);
  return <div>로그인 중입니다</div>;
}

export default Redirection;
