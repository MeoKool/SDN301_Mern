import axios from "axios";

export const loginMember = async (memberName, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/v1/auth/Login",
      {
        memberName,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error;
  }
};
