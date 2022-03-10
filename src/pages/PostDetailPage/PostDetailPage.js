import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './PostDetailPage.css'

const PostDetailPage = () => {
  const postId = useParams().id;
  const [data, setDatas] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setDatas(json);
      });
  }, []);
  return (
    <div className="table-detail">
      <table>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        <tr>
          <td scope="row">{data.id}</td>
          <td>{data.title}</td>
          <td>{data.body}</td>
        </tr>
      </table>
    </div>
  );
};

export default PostDetailPage;
