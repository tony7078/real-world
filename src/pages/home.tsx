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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 10;
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const paginatedArticles = data?.articles?.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => { // 페이지 변경
        setCurrentPage(page);
    };

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
        if (isLoggedIn === false) { // 비로그인 시 로그인 화면 이동
            navigate('/login');
            return;
        }
        if (favorited === false) { // 좋아요 추가
            try {
                const response = await addFavorites(slug);
                if (response.status === 200) {
                    getData();
                }
            } catch (err: unknown) { // 에러 핸들링
                Error(err);
            }
        } else { // 좋아요 취소
            try {
                const response = await deleteFavorites(slug);
                if (response.status === 200) {
                    getData();
                }
            } catch (err: unknown) { // 에러 핸들링
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
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    const getFeedData = async () => { // 피드 게시글 목록 조회
        try {
            const response = await getArticleFeedList();
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    }

    const getTag = async () => { // 태그 목록 불러오기
        try {
            const response = await getTagList();
            if (response.status === 200) {
                setTag(response.data);
            }
        } catch (err: unknown) { // 에러 핸들링
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
                        {paginatedArticles?.map((item) => (
                            <Preview key={item.slug} onClickLike={onClickLike} {...item} />
                        ))}
                         <ul className="pagination">
                            {data?.articlesCount ? (Array.from({ length: Math.ceil(data.articlesCount / itemsPerPage) }, (_, i) => (
                                <li key={i} className={"page-item" + (currentPage === i + 1 ? ' active' : '')}>
                                    <a className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</a>
                                </li>
                            ))) : (
                                <p>No articles are here... yet.</p>
                            )}
                        </ul>
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