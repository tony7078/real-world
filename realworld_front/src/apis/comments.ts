import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

const token = Cookies.get('token');

export const getComments = (slug: string) => { // 댓글 목록
    return axios.get(`${BASE_URL}/api/articles/${slug}/comments`);
};

export const createComments = (slug: string, postData: object) => { // 댓글 작성
    return axios.post(`${BASE_URL}/api/articles/${slug}/comments`, postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteComments = (slug: string, id: number) => { // 댓글 삭제 !! 수정 필요
    return axios.delete(`${BASE_URL}/api/articles/${slug}/comments/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};