import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import '../styles/Global.css';

const Comments = () => {
    const location = useLocation();
    const { post, user } = location.state;
    const [comments, setComments] = useState([]);
    const [isToAddComment, setIsToAddComment] = useState(false);
    const [updateComment, setUpdateComment] = useState('');
    const [body, setBody] = useState('');
    const [name, setName] = useState('');
    const [toSearchId, setToSearchId] = useState('');
    const [toSearchName, setToSearchName] = useState('');
    const [searchCommentsdBy, setSearchCommentsBy] = useState('');  


    useEffect(() => {
        fetch(`http://localhost:8080/comment?postId=${post.id}`)
            .then(response => response.json())
            .then(json => setComments(json))
            .catch(error => console.error('Error:', error));
    }, []);

    const addNewComment = async (postId) => {
        let addedComment = { 
            "postId": postId,
            "email": user.email,
            "name": name, 
            "body": body 
        };
        fetch('http://localhost:8080/comment', {
            method: 'POST',
            body: JSON.stringify(addedComment), 
            headers: {"Content-type": "application/json; charset=UTF-8"},
        })
            .then(response => response.json())
            .then(json=>{addedComment={"id":json.insertId,"postId": postId, "name": name, "email":user.email ,"body": body};
            setComments(prevComments => [...prevComments, addedComment]);})
            .catch(error => console.error('Error:', error));

        setBody('');
        setName('');
        setIsToAddComment(false);
    };

    const searchComments = (propertytype, property) => {
        if (property === '' || property === undefined) {
          fetch(`http://localhost:3000/comments?postId=${post.id}`)
              .then(response => response.json())
              .then(json => setComments(json))
              .then(setSearchCommentsBy('finished'))
              .catch(error => console.error('Error:', error));

        } else {
          fetch(`http://localhost:3000/comments?${propertytype}=${property}`)
              .then(response => response.json())
              .then(json => setComments(json))
              .then(setSearchCommentsBy('finished'))
              .catch(error => console.error('Error:', error));
        }
      };

    const deleteComment = (deleteCommentId) => {
        fetch(`http://localhost:8080/comment/${deleteCommentId}`, {
            method: "DELETE",
        })
            .catch(error => console.error('Error:', error));

        setComments(prevComments => prevComments.filter(comment => { return comment.id !== deleteCommentId; }));
    };

    const updateCommentFunc = (updateCommentObj) => {
        fetch(`http://localhost:8080/comment/${updateCommentObj.id}`, {
            method: "PUT",
            body: JSON.stringify({
                "name": updateCommentObj.name,
                "body": body
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"},
        })
            .then((response) => response.json())
            .catch(error => console.error('Error:', error));

        const updatedComment = {
            "postId": updateCommentObj.postId,
            "id": updateCommentObj.id, 
            "name": updateCommentObj.name, 
            "email": updateCommentObj.email, 
            "body": body };

        setComments(prevComments => prevComments.map((comment) => {
            return comment.id == updateCommentObj.id ? updatedComment : comment;
        }));
        setBody('');
        setUpdateComment('');
    };

    const cancel = () => {
        setIsToAddComment(false);
        setBody('');
        setName('');
        setUpdateComment('');
    };

    const cancelSearch = () => {
        setSearchCommentsBy('');
        setToSearchId('');
        setToSearchId('');
        setSearchCommentsBy('');
        fetch(`http://localhost:3000/comments?postId=${post.id}`)
          .then(response => response.json())
          .then(json => setComments(json))
          .catch(error => console.error('Error:', error));
      };

    return (
        <>
        <div className="container">
            <h2 className="heading">comments</h2>
            <div className="section search-section">
            <h3>Search Comments</h3>
                {searchCommentsdBy ==='id' ?
                <>
                <input
                    type="number"
                    placeholder="id"
                    value={toSearchId}
                    onChange={(e) => setToSearchId(e.target.value)}
                />
                <button onClick={() => searchComments(searchCommentsdBy, toSearchId)}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                :searchCommentsdBy === 'name'?
                    <>
                    <input
                        type="text"
                        placeholder="name"
                        value={toSearchName}
                        onChange={(e) => setToSearchName(e.target.value)}
                    />
                    <button onClick={() => searchComments(searchCommentsdBy, toSearchName)}>search</button>
                    <button onClick={() => { cancel(); }}>cancel</button><br />
                    </>
                    :searchCommentsdBy === 'finished' ?
                    <>
                      <button onClick={() => { cancelSearch(); }}>cancel search</button><br />
    
                    </>
                    :<>
                    <button onClick={()=>setSearchCommentsBy('id')}>search by id:</button>
                    <button onClick={()=>setSearchCommentsBy('name')}>search by name:</button>
                    </>
                }
            </div>

                {(comments.length>0) &&
                    <>
                        {comments.map((comment, i) => {
                            return (<div key={i}>
                                <p key={i}>id: {comment.id}, name: {comment.name}, email: {comment.email}
                                    <br />body: {comment.body}</p>
                                {comment.email == user.email && <>
                                    <button onClick={() => deleteComment(comment.id)}>delete comment</button>
                                    {updateComment==comment.id ? <>
                                        <input
                                            type="text"
                                            placeholder="body"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                        />
                                        <button onClick={() => { updateCommentFunc(comment); }}>update</button>
                                        <button onClick={() => { cancel(); }}>cancel</button>
                                    </>
                                        : <button onClick={() => setUpdateComment(comment.id)}>update comment</button>
                                    }
                                </>}
                            </div>);
                        })}
                    </>
                }
                {isToAddComment ?
                    <>
                        <input
                            type="text"
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <button onClick={() => addNewComment(post.id)}>add</button>
                        <button onClick={() => { cancel(); }}>cancel</button><br />
                    </>
                    : <button onClick={() => setIsToAddComment(true)}>add comment</button>
                }
            </div>
        </>
    );
};
export default Comments;