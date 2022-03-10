import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PostPage from "./pages/PostPage/PostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PostDetailPage from "./pages/PostDetailPage/PostDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  const token = localStorage.getItem("token");
  function onLogoutClicked() {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    window.location.reload();
  }
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  style={{ marginRight: "10px", color: "black" }}
                  className="nav-link"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ marginRight: "10px", color: "black" }}
                  className="nav-link"
                  to="/posts"
                >
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ marginRight: "10px", color: "black" }}
                  className="nav-link"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                {!token ? (
                  <Link
                    style={{ marginRight: "10px", color: "black" }}
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={onLogoutClicked}
                    style={{ marginRight: "10px" }}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
