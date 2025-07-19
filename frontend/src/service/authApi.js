import api from "./api.js";
export const register = async (username, password) => {
    return api.post("/register", username, password);
}