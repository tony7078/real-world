import { useNavigate } from "react-router-dom";
import { SignupUser } from "../../apis/user";
import { useState } from "react";
import Error from "../../util/Error";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => { // 이메일, 이름, 비밀번호 상태 값 변경
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "username") {
            setUsername(value);
        }
    };

    const onClickRegister = async (e: React.FormEvent<HTMLFormElement>) => { // 회원가입 요청
        e.preventDefault();
        if (email === "" || password === "" || username === "") return;
        try {
            const data  = { email, password, username };
            const postData = { "user": data };
            const response = await SignupUser(postData);
            if (response.status === 201) {
                alert("Sign up Successfully");
                navigate('/login');
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
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>
                        <form onSubmit={onClickRegister}>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" name="username" value={username} onChange={onChange} placeholder="Username" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="text" name="email" value={email} onChange={onChange} placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
                            </fieldset>
                            <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;