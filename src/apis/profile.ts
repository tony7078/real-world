import axios from "axios";

const BASE_URL = "https://api.realworld.io/api";

export const getProfile = (username: string) => { // 유저 프로필 조회
    return axios.get(`${BASE_URL}/profiles/${username}`);
};

export const userFollow = (username: string) => { // 유저 팔로우
    return axios.post(`${BASE_URL}/profiles/${username}/follow`, {
        withCredentials: true
    });
};

export const userUnfollow = (username: string) => { // 유저 언팔로우
    return axios.delete(`${BASE_URL}/profiles/${username}/follow`, {
        withCredentials: true
    });
};