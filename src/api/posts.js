import instance from "../axios/instance";

const addburger = async (newList) => {
    try {
        const response = await instance.post(`/api/menus`, newList);
        return response.data;
    } catch (err) {
        console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
    }
}
const getBurger = async (category) => {
    // console.log("category = ", category)
    try {
        const response = await instance.get(`/api/menus/${category}`);
        return response.data;
    } catch (err) {
        console.log(`데이터 불러오는 중에 오류 발생: ${err}`);
    }
}

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
export { addburger,getBurger,updateBurger };