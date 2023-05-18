import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Redirection() {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

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

        const accessToken = r.headers.authorization;
        const token = accessToken.split(" ")[1];

        setCookie("userAuth", token, { path: "/" });

        localStorage.setItem("name", r.data.username);
        alert("로그인 성공");
        navigate("/");
      });
  }, []);
  return <div>로그인 중입니다</div>;
}

export default Redirection;
