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

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "title") {
            setTitle(value);
        } else if (name === "description") {
            setDescription(value);
        }
    };

    const onChangeBody = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // 게시글 수정
        e.preventDefault();
        if (title === "" || description === "" || body === "" ) return;
        try {
            const data  = { title, description, body };
            const postData = { "article": data };
            const response = await updateArticle(slug, postData);
            if (response.status === 200) {
                navigate(`/article/${slug}`);
            }
        } catch (err: unknown) {
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
                                    <input type="text" className="form-control" placeholder="Enter tags" />
                                    <div className="tag-list">
                                        <span className="tag-default tag-pill">
                                            <i className="ion-close-round"></i> tag
                                        </span>
                                    </div>
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