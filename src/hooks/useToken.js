import { useCookies } from "react-cookie";

const useToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies("userAuth");
  const token = cookies.userAuth;

  return token;
};

export default useToken;
