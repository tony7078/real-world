import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserStore from "../../zustand/store";
import { LoginUser } from "../../apis/user";
import Error from "../../util/Error";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { login } = UserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => { // 이메일, 비밀번호 상태 값 변경
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onClickLogin = async (e: React.FormEvent<HTMLFormElement>) => { // 로그인 요청
        e.preventDefault();
        if (email === "" || password === "") return;
        try {
            const data  = { email, password };
            const postData = { "user": data };
            const response = await LoginUser(postData);
            if (response.status === 200) {
                const userInfo = response.data.user;
                if (userInfo) {
                    login(userInfo.username, userInfo.image);
                    Cookies.set('token', userInfo.token, { expires: 7 });
                    navigate('/');
                    window.location.reload();
                }
            }
        } catch (err: unknown) { // 에러 핸들링
            Error(err);
        }
    };

    return(
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>
                        <form onSubmit={onClickLogin}>
                            <fieldset className="form-group">
                                <input name="email" value={email} onChange={onChange} className="form-control form-control-lg" type="text" placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input name="password" value={password} onChange={onChange} className="form-control form-control-lg" type="password" placeholder="Password" />
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;