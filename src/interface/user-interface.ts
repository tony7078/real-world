interface User {
    email: string;
    bio: string | null;
    image: string | null;
    username: string;
    token: string;
};

export interface UserResponse {
    user: User;
};