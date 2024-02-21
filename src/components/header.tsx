import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [username, setUserName] = useState("");
    const [userImg, setUserImg] = useState("");
    
    useEffect(() => { // 로그인 된 유저 이름 및 아바타 조회
        const isLoggedIn = localStorage.getItem('username');
        const userImage = localStorage.getItem('image');
        if (isLoggedIn !== null) {
            setUserName(isLoggedIn);
        }
        setUserImg(userImage || "");
    }, []);

    return(
        username.length === 0 ? (
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">conduit</a>
                    <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Sign in</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/register">Sign up</a>
                    </li>
                    </ul>
                </div>
            </nav>
        ) : (
            <nav className="navbar navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">conduit</a>
                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`/settings/${username}`}> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                        </li>
                        {username !== "" && (
                            <li className="nav-item">
                                <Link to={`/profile/${username}`} state={{ user: username }} className="nav-link">
                                    <img src={userImg} className="user-pic" />
                                    {username}
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
          </nav>
        )
    )
}

export default Header;