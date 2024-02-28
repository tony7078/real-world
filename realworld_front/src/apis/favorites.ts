import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

const token = Cookies.get('token');

export const addFavorites = (slug: string) => { // 좋아요 추가
    return axios.post(`${BASE_URL}/api/articles/${slug}/favorite`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteFavorites = (slug: string) => { // 좋아요 삭제
    return axios.delete(`${BASE_URL}/api/articles/${slug}/favorite`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};