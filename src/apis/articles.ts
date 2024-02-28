import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

const token = Cookies.get('token');

export const getArticleFeedList = () => { // 팔로우한 게시글 목록 조회 완료
    return axios.get(`${BASE_URL}/api/articles/feed`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getArticleList = () => { // 글로벌 게시글 목록 조회 완료
    return axios.get(`${BASE_URL}/api/articles`);
};

export const createArticle = (postData: object) => { // 게시글 생성
    return axios.post(`${BASE_URL}/api/articles`, postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getArticle = (slug: string) => { // 게시글 조회 완료
    return axios.get(`${BASE_URL}/api/articles/${slug}`);
};

export const updateArticle = (slug: string, postData: object) => { // 게시글 수정
    return axios.put(`${BASE_URL}/api/articles/${slug}`, postData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteArticle = (slug: string) => { // 게시글 삭제
    return axios.delete(`${BASE_URL}/api/articles/${slug}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getUserArticle = (username: string) => { // 회원 작성 게시글 목록 조회
    return axios.get(`${BASE_URL}/api/articles/${username}`);
};

export const getFavArticle = (username: string) => { // 회원 피드 게시글 목록 조회
    return axios.get(`${BASE_URL}/api/articles/feed/${username}`);
};