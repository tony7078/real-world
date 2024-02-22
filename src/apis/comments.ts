import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://api.realworld.io/api";

const token = Cookies.get('token');

export const getComments = (slug: string) => { // 댓글 목록
    return axios.get(`${BASE_URL}/articles/${slug}/comments`);
};

export const createComments = (slug: string, postData: object) => { // 댓글 작성
    return axios.post(`${BASE_URL}/articles/${slug}/comments`, postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteComments = (slug: string) => { // 댓글 삭제
    return axios.delete(`${BASE_URL}/articles/${slug}/comments`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};