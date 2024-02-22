import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const onClickBtn = () => {
        localStorage.setItem('username', "jake");
        localStorage.setItem('image', "https://i.stack.imgur.com/xHWG8.jpg");
        const token = "asdasf";
        Cookies.set('token', token, { expires: 7 });
        navigate('/');
        window.location.reload();
    }
    return(
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>
                        <ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul>
                        <form>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button onClick={onClickBtn} className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;