import { useEffect, useState } from "react";
import { ArticleProps } from "../../interface/article-interface";
import { deleteArticle, getArticle } from "../../apis/articles";
import { CommentResponse } from "../../interface/comment-interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createComments, deleteComments, getComments } from "../../apis/comments";
import { addFavorites, deleteFavorites } from "../../apis/favorites";
import { userFollow, userUnfollow } from "../../apis/profile";
import { formatDate } from "../../util/util";
import Error from "../../util/Error";
import UserStore from "../../zustand/store";

const Article = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const slug = location?.state?.slug;
    const { isLoggedIn, userName, userAvatar } = UserStore();
    const [data, setData] = useState<ArticleProps>();
    const [commentData, setCommentData] = useState<CommentResponse>();
    const [body, setBody] = useState("");

    const onChangeComment = (e:React.ChangeEvent<HTMLTextAreaElement>) => { // 내용 상태 값 변경
        setBody(e.target.value);
    };

    const getArticleData = async (slug: string) => { // 게시글 조회
        try {
            const response = await getArticle(slug);
            if (response.status === 200) {
                setData(response.data?.article);
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    const getCommentData = async (slug: string) => { // 댓글 목록 조회
        try {
            const response = await getComments(slug);
            if (response.status === 200) {
                setCommentData(response.data);
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };
    
    const onClickEdit = (slug: string) => { // 게시글 수정
        navigate(`/revise/${slug}`, {
            state: data
        });
    };

    const onClickPost = async (e: React.FormEvent<HTMLFormElement>, slug: string) => { // 댓글 등록
        e.preventDefault();
        if (isLoggedIn === false) { // 비로그인 시 로그인 화면 이동
            navigate('/login');
            return;
        }
        if (body === "") return;
        try {
            const data  = { body };
            const postData = { "comment": data };
            const response = await createComments(slug, postData);
            if (response.status === 200) {
                navigate("/");
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    const onClickDelete = async (slug: string) => { // 게시글 삭제
        const ok = confirm("Are you sure you want to delete article?");
        if (ok) {
            try {
                const response = await deleteArticle(slug);
                if (response.status === 200) {
                    alert("Article is deleted successfully.");
                    navigate('/');
                }
            } catch (err: unknown) { // 에러 핸들링
                Error(err);
            }
        }
    };

    const onClickDeleteCmt = async (id: number) => { // 댓글 삭제
        const ok = confirm("Are you sure you want to delete Comment?");
        if (ok) {
            try {
                const response = await deleteComments(slug, id);
                if (response.status === 200) {
                    alert("Comment is deleted successfully.");
                    getCommentData(slug);
                }
            } catch (err: unknown) { // 에러 핸들링
                Error(err);
            }
        }
    }

    const onClickFavorite = async (slug: string, favorited: boolean) => { // 좋아요 추가 및 삭제 기능
        if (isLoggedIn === false) { // 비로그인 시 로그인 화면 이동
            navigate('/login');
            return;
        }
        try {
            if (favorited === false) { // 좋아요 추가
                const response = await addFavorites(slug);
                if (response.status === 200) {
                    getArticleData(slug);
                }
            } else { // 좋아요 취소
                const response = await deleteFavorites(slug);
                if (response.status === 200) {
                    getArticleData(slug);
                }
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    const onClickFollow = async (username: string, following: boolean) => { // 팔로우 추가 및 삭제 기능
        if (isLoggedIn === false) { // 비로그인 시 로그인 화면 이동
            navigate('/login');
            return;
        }
        try {
            if (following === false) { // 팔로우 추가
                const response = await userFollow(username);
                if (response.status === 200) {
                    getArticleData(slug);
                }
            } else { // 팔로우 취소
                const response = await userUnfollow(username);
                if (response.status === 200) {
                    getArticleData(slug);
                }
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    useEffect(() => {
        getArticleData(slug);
        getCommentData(slug);
    }, []);

    return(
        data && (
            <div className="article-page">
                <div className="banner">
                    <div className="container">
                        <h1>{data.title}</h1>
                        <div className="article-meta">
                            <Link to={`/profile/${data.author.username}`} state={{ user: data.author.username }}><img src={data.author.image} /></Link>
                            <div className="info">
                                <Link to={`/profile/${data.author.username}`} state={{ user: data.author.username }} className="author">{data.author.username}</Link>
                                <span className="date">{formatDate(data.createdAt)}</span>
                            </div>
                            {userName !== data.author.username && (
                                (!data.author.following ? (
                                        <button onClick={() => onClickFollow(data.author.username, data.author.following)} className="btn btn-sm btn-outline-secondary action-btn">
                                            <i className="ion-plus-round"></i>
                                            &nbsp; Follow {data.author.username}
                                        </button>
                                    ) : (
                                        <button onClick={() => onClickFollow(data.author.username, data.author.following)} className="btn btn-sm btn-outline-danger action-btn">
                                            <i className="ion-trash-a"></i>
                                            &nbsp; Unfollow {data.author.username}
                                        </button>
                                    ))
                            )}
                            &nbsp;&nbsp;
                            {data.favorited ? (
                                    <button onClick={() => onClickFavorite(data.slug, data.favorited)} className="btn btn-sm btn-outline-danger">
                                        <i className="ion-heart"></i>
                                        &nbsp; Unfavorite Post <span className="counter">({data.favoritesCount})</span>
                                    </button>
                                ) : (
                                    <button onClick={() => onClickFavorite(data.slug, data.favorited)} className="btn btn-sm btn-outline-primary">
                                        <i className="ion-heart"></i>
                                        &nbsp; Favorite Post <span className="counter">({data.favoritesCount})</span>
                                    </button>
                                )
                            }
                            {userName === data.author.username && (
                                <>
                                    <button onClick={() => onClickEdit(data.slug)} className="btn btn-sm btn-outline-secondary">
                                        <i className="ion-edit"></i> Edit Article
                                    </button>
                                    <button onClick={() => onClickDelete(data.slug)} className="btn btn-sm btn-outline-danger">
                                        <i className="ion-trash-a"></i> Delete Article
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-md-12">
                            <p>{data.body}</p>
                            <ul className="tag-list">
                                {data.tagList.map((item) => (
                                    <li className="tag-default tag-pill tag-outline" key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="article-actions">
                        <div className="article-meta">
                            <Link to={`/profile/${data.author.username}`} state={{ user: data.author.username }}><img src={data.author.image} /></Link>
                            <div className="info">
                                <Link to={`/profile/${data.author.username}`} state={{ user: data.author.username }} className="author">{data.author.username}</Link>
                                <span className="date">{formatDate(data.createdAt)}</span>
                            </div>
                            {userName !== data.author.username && (
                                (!data.author.following ? (
                                        <button onClick={() => onClickFollow(data.author.username, data.author.following)} className="btn btn-sm btn-outline-secondary action-btn">
                                            <i className="ion-plus-round"></i>
                                            &nbsp; Follow {data.author.username}
                                        </button>
                                    ) : (
                                        <button onClick={() => onClickFollow(data.author.username, data.author.following)} className="btn btn-sm btn-outline-danger action-btn">
                                            <i className="ion-trash-a"></i>
                                            &nbsp; Unfollow {data.author.username}
                                        </button>
                                    )
                                )
                            )}
                            &nbsp;
                            <button onClick={() => onClickFavorite(data.slug, data.favorited)} className="btn btn-sm btn-outline-primary">
                                <i className="ion-heart"></i>
                                &nbsp; Favorite Article <span className="counter">({data.favoritesCount})</span>
                            </button>
                            {userName === data.author.username && (
                                <>
                                    <button onClick={() => onClickEdit(data.slug)} className="btn btn-sm btn-outline-secondary">
                                        <i className="ion-edit"></i> Edit Article
                                    </button>
                                    <button onClick={() => onClickDelete(data.slug)} className="btn btn-sm btn-outline-danger">
                                        <i className="ion-trash-a"></i> Delete Article
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12 col-md-8 offset-md-2">
                            {isLoggedIn ? (
                                <form onSubmit={(e) => onClickPost(e, data.slug)} className="card comment-form">
                                    <div className="card-block">
                                        <textarea name="body" value={body} onChange={onChangeComment} className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                                    </div>
                                    <div className="card-footer">
                                        <img src={userAvatar} className="comment-author-img" />
                                        <button type="submit" className="btn btn-sm btn-primary">Post Comment</button>
                                    </div>
                                </form>
                            ) : (
                                <p show-authed="false" style={{ display: "inherit", textAlign: "center" }}>
                                    <a ui-sref="app.login" href="/login">Sign in</a> or <a ui-sref="app.register" href="/register">sign up</a> to add comments on this article.
                                </p>
                            )}
                            {commentData?.comments?.map((item) => (
                                <div className="card" key={item.id}>
                                    <div className="card-block">
                                        <p className="card-text">
                                            {item.body}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <a href={`/profile/${item.author.username}`} className="comment-author">
                                        <img src={item.author.image} className="comment-author-img" />
                                        </a>
                                        &nbsp;
                                        <a href={`/profile/${item.author.username}`} className="comment-author">{item.author.username}</a>
                                        <span className="date-posted">{formatDate(item.createdAt)}</span>
                                        {item.author.username === userName && (
                                            <button style={{ float: "right"}} onClick={() => onClickDeleteCmt(item.id)} className="btn btn-sm btn-outline-danger">
                                                <i className="ion-trash-a"></i> Delete Article
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Article;