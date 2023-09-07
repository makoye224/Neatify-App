import client from "./client";

const login = (email, password) => client.post("/auth/jwt/create/", { email, password });
export const forgot_password = (email) => client.post("/auth/users/reset_password/", { email });
export default {
  login,
};
