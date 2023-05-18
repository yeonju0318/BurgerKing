import instance from "../axios/instance";
// import { useCookies } from "react-cookie";
// const [cookies] = useCookies("userAuth");
// const token = cookies.userAuth;
// =====미사용=====
const addburger = async (payload) => {
  console.log("payload  =", payload);
  try {
    const response = await instance.post(
      `/api/menus`,
      {
        image: payload.image,
        category: payload.category,
        menuName: payload.menuName,
      },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
  }
};

const getBurgerAll = async (category) => {
  // console.log("category  = ",category)
  try {
    const response = await instance.get(`/api/menus`);
    return response.data;
  } catch (err) {
    console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
  }
};
const getBurger = async (category) => {
  // console.log("category  = ",category)
  try {
    const response = await instance.get(`/api/menus/${category}`);
    return response.data;
  } catch (err) {
    console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
  }
};

const updateBurger = async (payload) => {
  console.log(payload.content);
  try {
    const response = await instance.patch(
      `/api/menus/${payload.id}`,
      {
        title: payload.title,
        category: payload.category,
        content: payload.content,
        minPrice: payload.minPrice,
        deadline: payload.deadline,
      },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
    console.log("response.data = ", response.data);
    return response.data.data;
  } catch {
    console.log("포스트 수정 오류");
  }
};

const getBurgerKing = async (value1, value2) => {

  console.log("value1 = ", value1);
  console.log("value2 = ", value2);
  try {
    const response = await instance.get(
      `/api/store?city=${value1}&district=${value2}`
    );

    return response.data;
  } catch (err) {
    console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
  }

};

export { addburger, getBurger, updateBurger, getBurgerAll, getBurgerKing };
