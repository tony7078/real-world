import { Link } from "react-router-dom";
import { formatDate } from "../util/util";
import { PreviewProps } from "../interface/article-interface";

const Preview: React.FC<PreviewProps> = ({ onClickLike, ...item }) => {
    const handleLikeClick = () => { // 좋아요 버튼 콜백 함수
        onClickLike(item.slug, item.favorited);
    };

    return(
        <div className="article-preview" key={item.slug}>
            <div className="article-meta">
                <Link to={`/profile/${item.author.username}`} state={{ user: item.author.username }}>
                    <img src={item.author.image} />
                </Link>
                <div className="info">
                    <Link to={`/profile/${item.author.username}`} state={{ user: item.author.username }} className="author">{item.author.username}</Link>
                    <span className="date">{formatDate(item.createdAt)}</span>
                </div>
                <button onClick={handleLikeClick} className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {item.favoritesCount}
                </button>
            </div>
            <Link to={`/article/${item.slug}`} 
                state={{ slug: item.slug }}
                className="preview-link"
            >
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {item.tagList.map((item, index) => (
                        <li className="tag-default tag-pill tag-outline" key={index}>{item}</li>
                    ))}
                </ul>
            </Link>
        </div>
    )
}

export default Preview;