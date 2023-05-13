import React from "react";
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

function Signup() {
  return (
    <div style={{ backgroundColor: "#f2ebe6" }}>
      <Navbar message="회원가입" />
      <Container className="pt-20">
        <SignupContainer>
          <SignupTitle>기본정보</SignupTitle>
          <form>
            <InputContainer>
              <div>test</div>
              <div>
                <InputLabel>이메일 아이디</InputLabel>
                <InputField type="email" />
              </div>
              <div>
                <InputLabel>이름</InputLabel>
                <InputField type="text" />
              </div>
              <div>
                <InputLabel>휴대폰 번호</InputLabel>
                <InputField type="text" />
              </div>
            </InputContainer>
            <SignupTitle>선택정보</SignupTitle>
            <InputContainer>
              <div>test</div>
              <div className="flex">
                <InputLabel>성별</InputLabel>
                <InputRadio options={["남", "여"]} />
              </div>
              <div>
                <InputLabel>생년월일</InputLabel>
                <InputField type="text" />
              </div>
            </InputContainer>
            <SignupTitle>비밀번호 입력</SignupTitle>

            <InputContainer>
              <div>test</div>
              <div>
                <InputLabel>비밀번호</InputLabel>
                <InputField type="password" />
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
