import instance from "../axios/instance";

const login = async (users) => {
  try {
    const response = await instance.post(
      `${process.env.REACT_APP_SERVER_URL}/api/login`,
      users
      // {
      //   headers: {
      //     Authorization: "Bearer ACCESS_KEY",
      //   },
      // }
    );
    const accessToken = response.headers.get("ACCESS_KEY");

    const loginSuccess = response.data;
    alert(response.data);
    return { token: accessToken, loginSuccess };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };
