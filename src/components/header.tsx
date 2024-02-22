import { Link } from "react-router-dom";
import UserStore from "../zustand/store";

const Header = () => {
    const { isLoggedIn, userName, userAvatar } = UserStore();
    
    return(
        !isLoggedIn ? (
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
                            <a className="nav-link" href={`/settings/${userName}`}> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                        </li>
                        {userName !== "" && (
                            <li className="nav-item">
                                <Link to={`/profile/${userName}`} state={{ user: userName }} className="nav-link">
                                    <img src={userAvatar} className="user-pic" />
                                    {userName}
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