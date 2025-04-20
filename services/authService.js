import api from "./api";
import { REGISTER, LOGIN, GET_PROFILE } from "./api";

const register = async (userData) => {
    try {
        const response = await api.post(REGISTER, userData);
        // console.log("Registration response:", response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Registration failed");
    }
}

const signin = async (userData) => {
    try {
        const response = await api.post(LOGIN, userData);
        console.log("Login response token:", response.data.token);
        
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Login failed");
    }
}

const getProfile = async (token) => {
    try {
        const response = await api.get(GET_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch profile");
    }
}

export {getProfile, signin, register};