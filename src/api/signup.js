import axios from "axios";
import instance from "../axios/instance";

const signup = async (users) => {
  try {
    const { data } = await instance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/signup`,
      users
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { signup };
