import expensesRepository from "./expensesRepository";
import userRepository from "./userRepository";

const repositories = {
  expenses: expensesRepository,
  user: userRepository,
};

export { repositories };
