import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://api.realworld.io/api";

const token = Cookies.get('token');

export const LoginUser = (user: object) => { // 로그인 완료
    return axios.post(`${BASE_URL}/users/login`, user);
};

export const SignupUser = (user: object) => { // 회원가입
    return axios.post(`${BASE_URL}/users`, user);
};

export const getUserProfile = () => { // 사용자 조회 완료
    return axios.get(`${BASE_URL}/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateUserProfile = (user: object) => { // 사용자 프로필 수정 완료
    return axios.put(`${BASE_URL}/user`, user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};