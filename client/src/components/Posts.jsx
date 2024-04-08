import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Posts = () => {
  const location = useLocation();
  const { user } = location.state;
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isToAddPost, setIsToAddPost] = useState(false);
  const [displayDetails, setDisplayDetails] = useState('');
  const [isToUpdatePost, setIsToUpdatePost] = useState(false);
  const [displayComments, SetDisplayComments] = useState('');
  const [displayClass, setDisplayclass] = useState([]);
  const [showMore, setShowMore] = useState(true);


  useEffect(() => {
    fetch(`http://localhost:8080/post?limit=2&start=0`)
      .then(response => response.json())
      .then(json => setPosts(json))
  }, []);


  const deletePost = (deletePostId) => {
    fetch(`http://localhost:8080/post/${deletePostId}`, {
      method: "DELETE",
    })
      .catch(error => console.error('Error:', error));
    setPosts(prevPosts => prevPosts.filter(post => { return post.id !== deletePostId; }));
  };

  const getMoreDetails = (displayedPost) => {
    SetDisplayComments(false);
    let copyDisplayclass = [];
    posts.map((post, i) => { copyDisplayclass[i] = post.id == displayedPost.id ? "display" : "false" })
    setDisplayclass(copyDisplayclass);
    setDisplayDetails(displayedPost.id);
  };


  const addNewPost = () => {
    let addedPost = {
      "userId": user.id,
      "title": title,
      "body": body
    };
    fetch('http://localhost:8080/post', {
      method: 'POST',
      body: JSON.stringify(addedPost),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(json => {
        addedPost = { "id": json.insertId, "userId": user.id, "title": title, "body": body };
        setPosts(prevPosts => [...prevPosts, addedPost]);
      })
      .catch(error => console.error('Error:', error));

    setBody('');
    setTitle('');
    setIsToAddPost(false);
  };

  const updatePost = (postToUpdateObj) => {
    if (body == '')
      setBody(postToUpdateObj.body);
    if (title == '')
      setTitle(postToUpdateObj.title);
    const updatedPost = {
      "uesrId": user.id,
      "id": `${postToUpdateObj.id}`,
      "title": title,
      "body": body
    };

    fetch(`http://localhost:8080/post/${postToUpdateObj.id}`, {
      method: "PUT",
      body: JSON.stringify({
        "body": body,
        "title": title,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8", },
    })

    setPosts(prevPosts => prevPosts.map((post) => {
      return post.id == postToUpdateObj.id ? updatedPost : post;
    }));
    setBody('');
    setIsToUpdatePost(false);
  };

  const cancel = () => {
    setIsToAddPost(false);
    setIsToUpdatePost(false);
    setTitle('');
    setBody('');
  };

  const showMorePosts=()=>{
    const postArrayList = posts.length; 
    fetch(`http://localhost:8080/post?limit=2&start=${postArrayList + 2}`)
        .then(response => response.json())
        .then(json =>{json.length==0? setShowMore(false) : setPosts(prevPosts => [...prevPosts].concat(json))})
  }

  return (
    <>
      <div className="container">
        <h1 className="heading">Posts</h1>
        {posts.map((post, index) => (
          <div className={`${displayClass[index]}`} key={index}>
            <div className="item-content">
              <p><strong>id:</strong> {post.id} <strong>title:</strong> {post.title}</p>
            </div>
            {displayDetails == post.id ?
              <>
                <p className="item-content">uesr id: {post.userId}</p>
                <p className="item-content">body: {post.body}</p>
                <div className="actions item-actions">
                  {post.userId == user.id &&
                    <>
                      {isToUpdatePost ?
                        <>
                          <br />
                          <input
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                          />
                          <button onClick={() => updatePost(post)}>update</button>
                          <button onClick={() => cancel()}>cancel</button><br />
                        </>
                        : <button onClick={() => { setIsToUpdatePost(true) }}>update post</button>
                      }
                    </>
                  }
                  {post.userId == user.id && <button onClick={() => deletePost(post.id)}>delete post</button>}
                </div>
                {!displayComments ?
                  <button onClick={() => SetDisplayComments(true)} >show all comments</button>
                  :
                  <>
                    <Navigate to={`${post.id}/comments`} state={{ post: post, user: user }} />
                    <Outlet />
                  </>
                }
              </>
              : <button onClick={() => getMoreDetails(post)}>open post</button>
            }
            <br/>
          </div>
        ))}
        <div className="section add-section">
          {isToAddPost ? <>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button onClick={addNewPost}>add</button>
            <button onClick={() => { cancel(); }}>cancel</button>
          </>
            : <button onClick={() => setIsToAddPost(true)}>add post</button>
          }
          {showMore&&<button onClick={showMorePosts}>display more posts</button>}
        </div>
      </div>
    </>
  );
};
export default Posts;