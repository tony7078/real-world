import { useEffect, useState } from "react";
import { ProfileResponse } from "../../interface/profile-interface";
import { getProfile, userFollow, userUnfollow } from "../../apis/profile";
import { useLocation, useNavigate } from "react-router-dom";
import { ArticlesResponse } from "../../interface/article-interface";
import { getFavArticle, getUserArticle } from "../../apis/articles";
import Preview from "../../components/preview";
import { addFavorites, deleteFavorites } from "../../apis/favorites";
import Error from "../../util/Error";
import UserStore from "../../zustand/store";


const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location?.state?.user;
    const [feed, setFeed] = useState(false);
    const [data, setData] = useState<ProfileResponse>();
    const [artData, setArtData] = useState<ArticlesResponse>();
    const { isLoggedIn, userName } = UserStore();

    const handleFeed = () => { // 피드 or 좋아요 게시글
        if (feed === true) {
            setFeed(false);
            getUserData(user);
        }
        else {
            setFeed(true);
            getFavData(user);
        }
    }

    const onClickLike = async (slug: string, favorited: boolean) => { // 좋아요 추가 및 취소 기능
        if (isLoggedIn === false) {
            navigate('/login');
            return;
        }
        if (favorited === false) { // 좋아요 추가
            try {
                const response = await addFavorites(slug);
                if (response.status === 200) {
                    if (feed === true) {
                        getUserData(user);
                    } else {
                        getFavData(user);
                    }
                }
            } catch (err: unknown) { // 에러 핸들링
                Error(err);
            }
        } else { // 좋아요 취소
            try {
                const response = await deleteFavorites(slug);
                if (response.status === 200) {
                    if (feed === true) {
                        getUserData(user);
                    } else {
                        getFavData(user);
                    }
                }
            } catch (err: unknown) { // 에러 핸들링
                Error(err);
            }
        }
    };

    const onClickFollow = async (username: string, following: boolean) => { // 팔로우 추가 및 삭제 기능
        if (isLoggedIn === false) {
            navigate('/login');
            return;
        }
        try {
            if (following === false) { // 팔로우 추가
                const response = await userFollow(username);
                if (response.status === 200) {
                    setData(response.data);
                }
            } else { //팔로우 취소
                const response = await userUnfollow(username);
                if (response.status === 200) {
                    setData(response.data);
                }
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    const getProfileData = async (user: string) => { // 유저 프로필 조회
        try {
            const response = await getProfile(user);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (err: unknown) {
            Error(err);
        }
    };

    const getUserData = async (user: string) => { // 유저 작성 게시글 목록 조회
        try {
            const response = await getUserArticle(user);
            if (response.status === 200) {
                setArtData(response.data);
            }
        } catch (err: unknown) {
            Error(err);
        }
    };

    const getFavData = async (user: string) => { // 유저 좋아요 게시글 목록 조회
        try {
            const response = await getFavArticle(user);
            if (response.status === 200) {
                setArtData(response.data);
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    useEffect(() => {
        getProfileData(user);
        getUserData(user);
    }, []);

    return(
        data && (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img src={data.profile.image} className="user-img" />
                                <h4>{data.profile.username}</h4>
                                <p>{data.profile.bio}</p>
                                {userName === data.profile.username ? (
                                    <button className="btn btn-sm btn-outline-secondary action-btn">
                                        <i className="ion-gear-a"></i>
                                        &nbsp; <a href={`/settings/${userName}`}>Edit Profile Settings</a>
                                    </button>
                                ) : (
                                    (!data.profile.following ? (
                                        <button onClick={() => onClickFollow(data.profile.username, data.profile.following)} className="btn btn-sm btn-outline-secondary action-btn">
                                            <i className="ion-plus-round"></i>
                                            &nbsp; Follow {data.profile.username}
                                        </button>
                                    ) : (
                                        <button onClick={() => onClickFollow(data.profile.username, data.profile.following)} className="btn btn-sm btn-outline-danger action-btn">
                                            <i className="ion-trash-a"></i>
                                            &nbsp; Unfollow {data.profile.username}
                                        </button>
                                    ))
                                )}                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="articles-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <a className={"nav-link" + (feed ? '' : ' active')} onClick={handleFeed}>My Articles</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={"nav-link" + (feed ? ' active' : '')} onClick={handleFeed}>Favorited Articles</a>
                                    </li>
                                </ul>
                            </div>
                            {artData?.articles ? (
                                artData.articles.map((item) => (
                                    <Preview key={item.slug} onClickLike={onClickLike} {...item} />
                                ))
                            ) : (
                                <p>No articles are here... yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Profile;