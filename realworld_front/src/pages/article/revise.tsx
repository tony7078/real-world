import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateArticle } from "../../apis/articles";
import Error from "../../util/Error";

const Revise = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const slug = location.state?.slug;
    const [title, setTitle] = useState(location.state?.title || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [body, setBody] = useState(location.state?.body || "");
    const [tagList, setTagList] = useState<string[]>(location.state?.tagList || []);
    const [tag, setTag] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => { // 제목, 설명, 태그 상태 값 변경
        const { target: { name, value } } = e;
        if (name === "title") {
            setTitle(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "tag") {
            setTag(value);
        }
    };

    const onChangeBody = (e:React.ChangeEvent<HTMLTextAreaElement>) => { // 내용 상태 값 변경
        setBody(e.target.value);
    };

    const onClickAdd = (tag: string) => { // 태그 추가
        if(tag === "") return;
        setTagList([...tagList, tag]);
        setTag("");
    };

    const onClickDelete = (tagName: string) => { // 태그 삭제
        const updatedTagList = tagList.filter(tag => tag !== tagName);
        setTagList(updatedTagList);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // 게시글 수정
        e.preventDefault();
        if (title === "" || description === "" || body === "" || tagList.length === 0 ) return;
        try {
            const data  = { title, description, body, tagList };
            const postData = { "article": data };
            const response = await updateArticle(slug, postData);
            if (response.status === 200) {
                navigate(`/article/${slug}`);
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    return(
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {title.length === 0 && (
                            <ul className="error-messages">
                                <li>That title is required</li>
                            </ul>
                        )}
                        <form onSubmit={onSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input type="text" onChange={onChange} name="title" value={title} className="form-control form-control-lg" placeholder="Article Title" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" onChange={onChange} name="description" value={description} className="form-control" placeholder="What's this article about?" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control"
                                        onChange={onChangeBody}
                                        value={body}
                                        name="body"
                                        rows={8}
                                        placeholder="Write your article (in markdown)"
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <div style={{ display: "flex" }}>
                                        <input type="text" className="form-control" placeholder="Enter tags" name="tag" value={tag} onChange={onChange} />
                                        <button type="button" onClick={() => onClickAdd(tag)} className="btn btn-sm btn-outline-secondary action-btn">
                                            <i className="ion-plus-round"></i> Add
                                        </button>
                                    </div>
                                    {tagList.map((item, index) => (
                                        <div className="tag-list" key={index}>
                                            <span onClick={() => onClickDelete(item)} className="tag-default tag-pill"> <i className="ion-close-round"></i> {item} </span>
                                        </div>
                                    ))}
                                </fieldset>
                                <button type="submit" className="btn btn-lg pull-xs-right btn-primary">
                                    Edit Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revise;