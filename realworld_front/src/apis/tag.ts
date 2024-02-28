import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getTagList = () => { // 태그 목록 조회 완료
    return axios.get(`${BASE_URL}/api/tags`);
};