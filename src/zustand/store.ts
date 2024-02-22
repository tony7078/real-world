import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userData {
    isLoggedIn : boolean;
    userName: string;
    userAvatar: string;
    login: (name: string, img: string) => void;
    logout: () => void;
};

const UserStore = create(persist<userData>(
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
        },
    }), { name: "user-StoreName"}
));

export default UserStore;