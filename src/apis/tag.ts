import axios from "axios";

const BASE_URL = "https://api.realworld.io/api";

export const getTagList = () => { // 태그 목록 조회 완료
    return axios.get(`${BASE_URL}/tags`);
};