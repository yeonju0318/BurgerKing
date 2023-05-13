import axios from "axios";

export const addUser = async (newUser) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/signup`,
      newUser
    );
    alert("회원가입 성공!");
  } catch (error) {
    console.log(error.response.message);
  }
};
