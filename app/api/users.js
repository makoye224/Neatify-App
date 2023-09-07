import client from "./client";

const register = (userInfo) => client.post("/auth/users/", userInfo);

export default { register };
