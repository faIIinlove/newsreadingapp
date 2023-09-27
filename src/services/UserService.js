import AxiosInstance from "../utils/helpers/AxiosInstance";


export const register = async (email, password) => {
    const body = { email, password };
    const response = await AxiosInstance().post('/users/register', body);
    return response;
}

export const login = async (email, password) => {
    const body = { email, password };
    const response = await AxiosInstance().post('/auth/login', body);
    return response;
}

export const updateInfomation = async (infomation) => {
    const response = await AxiosInstance().post(`/users/update-profile`, infomation);
    return response;
}

