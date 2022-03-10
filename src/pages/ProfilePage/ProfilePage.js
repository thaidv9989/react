import React from "react";
import { useState, useEffect } from "react";
import LoginPage from "../LoginPage/LoginPage";
import './ProfilePage.css'

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token && userId) {
      fetch(`https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          setUserInfo(json);
        });
    }
  }, [token, userId]);

  return token ? (
    <div className="details">
      <table>
          <tr>
            <th scope="col">UserID</th>
            <th scope="col">UserName</th>
          </tr>
        <tr>
          <td scope="row">{userInfo?.id}</td>
          <td>{userInfo?.name}</td>
        </tr>
      </table>
    </div>
  ) : (
    <div className="col-md-12 text-center">
      <b>You need to login to continue</b>
      <LoginPage />
    </div>
  );
};

export default ProfilePage;
