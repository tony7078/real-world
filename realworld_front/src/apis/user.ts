import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

const token = Cookies.get('token');

export const LoginUser = (user: object) => { // 로그인 완료
    return axios.post(`${BASE_URL}/api/users/login`, user);
};

export const SignupUser = (user: object) => { // 회원가입
    return axios.post(`${BASE_URL}/api/users`, user);
};

export const getUserProfile = () => { // 사용자 조회 완료
    return axios.get(`${BASE_URL}/api/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateUserProfile = (user: object) => { // 사용자 프로필 수정 완료
    return axios.put(`${BASE_URL}/api/user`, user, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};