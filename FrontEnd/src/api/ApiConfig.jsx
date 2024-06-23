import instance, { customAxios } from "../components/setUp/axios";
export const BASE_URL = "http://localhost:5000/v1/";
const SignInAccount = (memberName, password) => {
  return instance.post(`auth/Login`, {
    memberName,
    password,
  });
};
export { SignInAccount };
