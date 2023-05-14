import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Container,
  SignupContainer,
  InputContainer,
  Button,
  SignupTitle,
  InputLabel,
  InputField,
} from "../style/signup";
import InputRadio from "../components/Signup/InputRadio";
import useInput from "../hooks/useInput";
import { useMutation, useQueryClient } from "react-query";
import { signup } from "../api/signup";

function Signup() {
  const [username, onChangeUsernameHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();
  const [email, onChangeEmailHandler] = useInput();

  // const queryClient = useQueryClient();
  const mutation = useMutation(signup, {
    onSuccess: () => {
      console.log("회원가입 완료");
    },
  });

  //유효성 검사
  const formValidation = (e) => {
    e.preventDefault();
    const usernameRegex = /^[a-z0-9]{4,10}$/;
    const passwordRegex = /^[a-zA-Z0-9]{8,15}$/;

    if (!username || !password || !email) {
      alert("이메일,비밀번호와 닉네임을 모두 입력하세요.");
      return;
    } else if (!usernameRegex.test(username)) {
      alert("닉네임은 최소 4~10자, 알파벳 소문자 및 숫자로 구성되어야 합니다.");
      return;
    } else if (!passwordRegex.test(password)) {
      alert(
        "비밀번호는 최소 8~15자, 알파벳 대소문자 및 숫자로 구성되어야 합니다."
      );
      return;
    } else {
      mutation.mutate({
        username,
        password,
        email,
      });
    }
    alert("회원가입 완료");
    return navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#f2ebe6" }}>
      <Navbar message="회원가입" />
      <Container className="pt-20">
        <SignupContainer>
          <SignupTitle>기본정보</SignupTitle>
          <form ouSubmit={formValidation}>
            <InputContainer>
              <div>test</div>
              <div>
                <InputLabel>이메일 아이디</InputLabel>
                <InputField
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmailHandler}
                />
              </div>
              <div>
                <InputLabel>닉네임</InputLabel>
                <InputField
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={onChangeUsernameHandler}
                />
              </div>
            </InputContainer>
            <SignupTitle>선택정보</SignupTitle>
            <InputContainer>
              <div>test</div>
              <div className="flex">
                <InputLabel>ADMIN</InputLabel>
                <InputRadio options={["체크"]} />
              </div>
              <div>
                <InputLabel>TOKEN</InputLabel>
                <InputField type="text" />
              </div>
            </InputContainer>
            <SignupTitle>비밀번호 입력</SignupTitle>

            <InputContainer>
              <div>test</div>
              <div>
                <InputLabel>비밀번호</InputLabel>
                <InputField
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChangePasswordHandler}
                />
              </div>
            </InputContainer>
            <div className="flex justify-center">
              <Button>회원가입</Button>
            </div>
          </form>
        </SignupContainer>
      </Container>
    </div>
  );
}

export default Signup;
