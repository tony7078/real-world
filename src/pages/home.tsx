import { useEffect, useState } from "react";
import { ArticlesResponse } from "../interface/article-interface";
import { getArticleFeedList, getArticleList } from "../apis/articles";
import { addFavorites, deleteFavorites } from "../apis/favorites";
import { useNavigate } from "react-router-dom";
import { getTagList } from "../apis/tag";
import { TagsProps } from "../interface/tag-interface";
import Preview from "../components/preview";
import Error from "../util/Error";
import UserStore from "../zustand/store";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ArticlesResponse>();
    const [tag, setTag] = useState<TagsProps>();
    const [feed, setFeed] = useState(false);
    const { isLoggedIn } = UserStore();

    const handleFeed = () => { // 피드 or 글로벌 게시글
        if(feed === true) {
            setFeed(false);
            getData();
        }
        else {
            setFeed(true);
            getFeedData();
        }
    }

    const onClickLike = async (slug: string, favorited: boolean) => { // 좋아요 추가 및 삭제 기능
        if (isLoggedIn === false) {
            navigate('/login');
            return;
        }
        if (favorited === false) {
            try {
                const response = await addFavorites(slug);
                if (response.status === 200) {
                    getData();
                }
            } catch (err: unknown) {
                Error(err);
            }
        } else {
            try {
                const response = await deleteFavorites(slug);
                if (response.status === 200) {
                    getData();
                }
            } catch (err: unknown) {
                Error(err);
            }
        }
    };

    const getData = async () => { // 게시글 목록 조회
        try {
            const response = await getArticleList();
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (err: unknown) {
            Error(err);
        }
    };

    const getFeedData = async () => { // 피드 게시글 목록 조회
        try {
            const response = await getArticleFeedList();
            if(response.status === 200){
                setData(response.data);
            }
        } catch (err: unknown) {
            Error(err);
        }
    }

    const getTag = async () => { // 태그 목록 불러오기
        try {
            const response = await getTagList();
            if(response.status === 200){
                setTag(response.data);
            }
        } catch (err: unknown) {
            Error(err);
        }
    }

    useEffect(() => {
        getData();
        getTag();
    }, []);

    return(
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {isLoggedIn && (
                                    <li className="nav-item">
                                        <a className={"nav-link" + (feed ? ' active' : '')} onClick={handleFeed}>Your Feed</a>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <a className={"nav-link" + (feed ? '' : ' active')} onClick={handleFeed}>Global Feed</a>
                                </li>
                            </ul>
                        </div>
                        {data?.articles?.map((item) => (
                            <Preview key={item.slug} onClickLike={onClickLike} {...item} />
                        ))}
                    </div>
                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            {tag?.tags.map((item) => (
                                <span className="tag-list" key={item}>
                                    <a href="" className="tag-pill tag-default">{item}</a>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;