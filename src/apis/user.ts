import axios from "axios";

const BASE_URL = "https://api.realworld.io/api";

export const LoginUser = (user: object) => { // 로그인
    return axios.post(`${BASE_URL}/user/login`, user);
};

export const SignupUser = (user: object) => { // 회원가입
    return axios.post(`${BASE_URL}/users`, user);
};

export const getUserProfile = () => { // 사용자 조회
    return axios.get(`${BASE_URL}/user`);
};

export const updateUserProfile = (user: object) => { // 사용자 프로필 수정
    return axios.put(`${BASE_URL}/user`, user);
};