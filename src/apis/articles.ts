import axios from "axios";

const BASE_URL = "https://api.realworld.io/api";

export const getArticleFeedList = () => { // 팔로우한 게시글 목록 조회
    return axios.get(`${BASE_URL}/articles/feed`, {
        withCredentials: true
    });
};

export const getArticleList = () => { // 글로벌 게시글 목록 조회
    return axios.get(`${BASE_URL}/articles`);
};

export const createArticle = (postData: object) => { // 게시글 생성
    return axios.post(`${BASE_URL}/articles`, postData, {
        withCredentials: true
    });
};

export const getArticle = (slug: string) => { // 게시글 조회
    return axios.get(`${BASE_URL}/articles/${slug}`);
};

export const updateArticle = (slug: string, postData: object) => { // 게시글 수정
    return axios.put(`${BASE_URL}/articles/${slug}`, postData, {
        withCredentials: true
    });
};

export const deleteArticle = (slug: string) => { // 게시글 삭제
    return axios.delete(`${BASE_URL}/articles/${slug}`, {
        withCredentials: true
    });
};

export const getUserArticle = (username: string) => { // 회원 작성 게시글 목록 조회
    return axios.get(`${BASE_URL}/articles/${username}`);
};

export const getFavArticle = (username: string) => { // 회원 피드 게시글 목록 조회
    return axios.get(`${BASE_URL}/articles/feed/${username}`);
};