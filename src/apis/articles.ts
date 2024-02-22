import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://api.realworld.io/api";

const token = Cookies.get('token');

export const getArticleFeedList = () => { // 팔로우한 게시글 목록 조회 완료
    return axios.get(`${BASE_URL}/articles/feed`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getArticleList = () => { // 글로벌 게시글 목록 조회 완료
    return axios.get(`${BASE_URL}/articles`);
};

export const createArticle = (postData: object) => { // 게시글 생성
    return axios.post(`${BASE_URL}/articles`, postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getArticle = (slug: string) => { // 게시글 조회 완료
    return axios.get(`${BASE_URL}/articles/${slug}`);
};

export const updateArticle = (slug: string, postData: object) => { // 게시글 수정
    return axios.put(`${BASE_URL}/articles/${slug}`, postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteArticle = (slug: string) => { // 게시글 삭제
    return axios.delete(`${BASE_URL}/articles/${slug}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getUserArticle = (username: string) => { // 회원 작성 게시글 목록 조회
    return axios.get(`${BASE_URL}/articles/${username}`);
};

export const getFavArticle = (username: string) => { // 회원 피드 게시글 목록 조회
    return axios.get(`${BASE_URL}/articles/feed/${username}`);
};