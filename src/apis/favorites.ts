import axios from "axios";

const BASE_URL = "https://api.realworld.io/api";

export const addFavorites = (slug: string) => { // 좋아요 추가
    return axios.get(`${BASE_URL}/articles/${slug}/favorite`, {
        withCredentials: true
    });
};

export const deleteFavorites = (slug: string) => { // 좋아요 삭제
    return axios.post(`${BASE_URL}/articles/${slug}/favorite`, {
        withCredentials: true
    });
};