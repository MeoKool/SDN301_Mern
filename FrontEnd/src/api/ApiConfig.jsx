import instance, { customAxios } from "../components/setUp/axios";
export const BASE_URL = "http://localhost:5000/v1/";

const SignInAccount = (memberName, password) => {
  return instance.post(`auth/Login`, {
    memberName,
    password,
  });
};
const getAllWatches = () => {
  return instance.get(`watch/getAllWatches`);
};
const getWatchesById = (id) => {
  return instance.get(`watch/getByIdWatches/${id}`);
};
const createFeedback = (idMember, idWatch, rating, content) => {
  return customAxios.post(`feedback/${idWatch}/comments`, {
    rating,
    content,
    author: idMember,
  });
};
const deleteFeedback = (idWatch, idComment) => {
  return customAxios.delete(`feedback/${idWatch}/comments/${idComment}`);
};
const editFeedback = (idWatch, idComment, rating, content, idMember) => {
  return customAxios.put(`feedback/${idWatch}/comments/${idComment}`, {
    rating,
    content,
    author: idMember,
  });
};
const getUserInfo = (id) => {
  return customAxios.get(`auth/getByMemberName/${id}`);
};
const changePassword = (memberName, oldPassword, newPassword) => {
  return customAxios.post(`auth/changePassword`, {
    memberName,
    oldPassword,
    newPassword,
  });
};
const GetAllMember = () => {
  return customAxios.get(`auth/getAllMembers`);
};
const GetAllBrand = () => {
  return customAxios.get(`brand/getAllBrands`);
};
const CreateBrand = (brandName) => {
  return customAxios.post(`brand/createBrand`, {
    brandName,
  });
};
const CreateMember = (memberName, password, name, yob) => {
  return customAxios.post(`auth/createUser`, {
    memberName,
    password,
    name,
    yob,
  });
};
export {
  CreateMember,
  SignInAccount,
  getAllWatches,
  getWatchesById,
  createFeedback,
  deleteFeedback,
  editFeedback,
  getUserInfo,
  changePassword,
  GetAllMember,
  GetAllBrand,
  CreateBrand,
};
