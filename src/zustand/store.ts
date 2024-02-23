import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface userData {
    isLoggedIn : boolean;
    userName: string;
    userAvatar: string;
    login: (name: string, img: string) => void;
    logout: () => void;
};

const UserStore = create(persist<userData>( // 상태 관리 정보(로그인 상태, 로그인한 유저 이름, 로그인한 유저 아바타 이미지)
    (set) => ({
        isLoggedIn: false,
        userName: "",
        userAvatar: "",
        login: (name, img) => {
            set({ 
                isLoggedIn: true,
                userName: name,
                userAvatar: img
            });
        },
        logout: () => {
            set({ isLoggedIn: false });
            localStorage.clear();
            Cookies.remove('token');
        },
    }), { name: "user-StoreName"}
));

export default UserStore;