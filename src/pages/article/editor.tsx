import { useState } from "react";
import { createArticle } from "../../apis/articles";
import { useNavigate } from "react-router-dom";
import Error from "../../util/Error";

const Editor = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "title") {
            setTitle(value)
        } else if (name === "description") {
            setDescription(value)
        }
    };

    const onChangeBody = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // 게시글 등록
        e.preventDefault();
        if (title === "" || description === "" || body === "" ) return;
        try {
            const data  = { title, description, body };
            const postData = { "article": data };
            const response = await createArticle(postData);
            if (response.status === 201) {
                navigate("/");
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
                                        <span className="tag-default tag-pill"> <i className="ion-close-round"></i> tag </span>
                                    </div>
                                </fieldset>
                                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor;