import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./PostPage.css";

const PostPage = () => {
  const [datas, setDatas] = useState([]);
  const [search, setSearchs] = useState("");

  useEffect(() => {
    getListPosts();
  }, []);
  function getListPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setDatas(resp);
      });
    });
  }
  const dataFilter = datas.filter((data) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );
  function handleRemove(id) {
    const newList = datas.filter((item) => item.id !== id);

    setDatas(newList);
  }
  return (
    <div>
      <input
        type="text"
        id="myInput"
        value={search}
        onChange={(evt) => setSearchs(evt.target.value)}
        placeholder="Search for title.."
        title="Type in a name"
      ></input>
      <table>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th colspan="2">Action</th>
        </tr>
        {dataFilter.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>
              <button className="btn btn-success">
                <Link to={`/post/${row.id}`}>View detail</Link>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(row.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default PostPage;
