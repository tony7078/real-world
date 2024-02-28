import { Author } from "./article-interface";

interface CommentProps {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
};

export interface CommentResponse {
    comments: CommentProps[];
};