import axiosObj from "./Repository";

export default {
  addExpense(payload) {
    return axiosObj.post("/expense", payload);
  },

  getExpenses() {
    return axiosObj.get("/expenses");
  },

  deleteExpense(id) {
    return axiosObj.delete(`expense/${id}`);
  },
};
