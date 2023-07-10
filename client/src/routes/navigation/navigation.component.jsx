// HomePage.jsx
import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import './navigation.styles.scss';
import { UserContext } from "../../contexts/user.context";


const Navigation = () => {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const signOutUser = () => {
    setCurrentUser(null);
    localStorage.clear();
  };
  return (
    <Fragment>
      <div className="navigationContainer">
        <Link to='/' className="logoText">市一所 | 项目部</Link>
        {
          currentUser ? 
          <Link to='/' className="signOutBtn" onClick={signOutUser}>登出</Link>
          :
          <Link to='/auth' className="loginBtn">登录</Link>
        }
      </div>
      <Outlet />
    </Fragment>

  );
}

export default Navigation;
