import React from "react";
import { useCookies } from "react-cookie";
import { styled } from "styled-components";

function Profile() {
  const [cookies, removeCookie] = useCookies("userAuth");

  const logoutHandler = async () => {
    try {
      removeCookie("userAuth");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return <LogoutButton onClick={logoutHandler}>로그아웃</LogoutButton>;
}

export default Profile;

const LogoutButton = styled.div`
  background-color: #512314;
  width: 168px;
  height: 50px;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
`;
