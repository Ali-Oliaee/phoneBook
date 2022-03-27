import axios from "./axios";

export const getUsersData = () => axios.get("users/").then(({ data }) => data);
