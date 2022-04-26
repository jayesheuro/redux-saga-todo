import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../Constants/actionTypes";
function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let path = location.pathname;
  const { user } = useSelector((state) => state.userData);

  const handleLogout = () => {
    dispatch({
      type: actionTypes.LOGOUT_USER,
    });
    navigate("/login");
  };
  return (
    <div className="navbarWrapper">
      <div className="title">
        <h1 className="heading">My Todo List</h1>
        {user.username ? (
          <div className="authButton">
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="authButton">
            <Link to="/login" className="authLink">
              <h4>Login</h4>
            </Link>
            <Link to="/signup" className="authLink">
              <h4>Signup</h4>
            </Link>
          </div>
        )}
      </div>
      {(path === "/" || path === "/allTodos") && user.isAdmin && (
        <Link className="addButton" to="/add">
          Add Todo
        </Link>
      )}
    </div>
  );
}

export default Navbar;
