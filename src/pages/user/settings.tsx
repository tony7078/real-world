import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../../interface/user-interface";
import { getUserProfile, updateUserProfile } from "../../apis/user";
import Error from "../../util/Error";
import UserStore from "../../zustand/store";

const dummy = {
    "user": {
        "email": "jake@jake.jake",
        "token": "jwt.token.here",
        "username": "jake",
        "bio": "I work at statefarm",
        "image": null
      }
}

const Settings = () => {
    const navigate = useNavigate();
    const { logout } = UserStore();
    const [data, setData] = useState<UserResponse>(dummy);
    const [image, setImage] = useState(data?.user?.image || "");
    const [name, setName] = useState(data?.user?.username || "");
    const [bio, setBio] = useState(data?.user?.bio || "");
    const [email, setEmail] = useState(data?.user?.email || "");
    const [password, setPassword] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "image") {
            setImage(value);
        } else if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onChangeBio = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // 프로필 수정
        e.preventDefault();
        if (email === "" || name === "") return;
        try {
            const user = { image, name, bio, email, password }; 
            const response = await updateUserProfile(user);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (err: unknown) {
            Error(err);
        }
    };

    const Logout = () => { // 로그아웃 기능
        const ok = confirm("Are you sure you want to log out?");
        if (ok) {
            navigate('/');
            logout();
            window.location.reload();
        }
    };

    const getUserData = async () => { // 기존 사용자 프로필 조회
        try {
            const response = await getUserProfile();
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (err: unknown) {
            Error(err);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return(
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        {name.length === 0 && (
                            <ul className="error-messages">
                                <li>That name is required</li>
                            </ul>
                        )}
                        <form onSubmit={onSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" name="image" value={image} onChange={onChange} type="text" placeholder="URL of profile picture" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" name="name" value={name} onChange={onChange} type="text" placeholder="Your Name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        name="bio"
                                        value={bio}
                                        onChange={onChangeBio}
                                        rows={8}
                                        placeholder="Short bio about you"
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" name="email" value={email} onChange={onChange} type="text" placeholder="Email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="New Password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                    />
                                </fieldset>
                                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                            </fieldset>
                        </form>
                        <hr />
                        <button onClick={Logout} className="btn btn-outline-danger">Or click here to logout.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;