import axiosObj from "./Repository";

export default {
  getUser(id) {
    return axiosObj.get(`/user/${id}`);
  },
};
