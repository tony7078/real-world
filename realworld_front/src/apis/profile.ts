import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

const token = Cookies.get('token');

export const getProfile = (username: string) => { // 유저 프로필 조회
    return axios.get(`${BASE_URL}/api/profiles/${username}`);
};

export const userFollow = (username: string) => { // 유저 팔로우
    return axios.post(`${BASE_URL}/api/profiles/${username}/follow`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const userUnfollow = (username: string) => { // 유저 언팔로우
    return axios.delete(`${BASE_URL}/api/profiles/${username}/follow`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};