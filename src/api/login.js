import instance from "../axios/instance";

const login = async (users) => {
  try {
    const response = await instance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/login`,
      users
    );
    // console.log(response.headers.get("authorization"));

    const accessToken = response.headers.get("authorization");
    const token = accessToken.split(" ")[1];
    const loginSuccess = response.data;
    alert(response.data.msg);

    return { token, loginSuccess };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };
