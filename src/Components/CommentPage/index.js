import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";

//060ArFua9saK6pXR7xfO

function CommentPage({
    match: {
      params: { id },
    },
  }) {

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([0])
  const [comment, setComment] = useState('')
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    GetComments();
  }, [refresh]);

  const GetComments = () => {
    const userToken = localStorage.getItem("token")
    const headers = {
      Authorization: userToken
    }
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}`, {headers})
    .then((response) => {
      console.log(response);
      setPost(response.data.post);
      console.log(response.data.post.comments);
      setComments(response.data.post.comments);
    }) 
    .catch((error) => {
      console.log(error)
    })
  }

  const SendComment = () =>{
    const body = {
      text: comment,
    }

    const userToken = localStorage.getItem("token")
    const headers = {
      Authorization: userToken
    }

    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/comment`, body, {headers})
    .then(response => {
      console.log(response);
      setComment('');
      GetComments();
    })
    .catch(error => {
      console.log(error);
    })
  }

  const PutPostVote = (direction) => {
    const body = {
      "direction": direction
    }

    const userToken = localStorage.getItem("token")
    const headers = {
      Authorization: userToken
    }

    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`, body, {headers})
    .then(response => {
      console.log(response);
      setRefresh(refresh + 1);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const PutCommentVote = (direction, commentId) => {
    const body = {
      "direction": direction
    }

    const userToken = localStorage.getItem("token")
    const headers = {
      Authorization: userToken
    }

    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/comment/${commentId}/vote`, body, {headers})
    .then(response => {
      console.log(response);
      setRefresh(refresh + 1);
    })
    .catch(error => {
      console.log(error);
    })
  }

  function MountPost(){
    return post && <div>
      <div div style={{background:'grey'}}>
        <h4>{post.username}</h4>
        <h4>{post.title}</h4>
        <p>{post.text}</p>
        <div style={{display:'flex', justifyContent:"space-around"}}>
          <button onClick={() => PutPostVote(1)}>Up vote</button> 
          <p>{post.votesCount}</p>
          <button onClick={() => PutPostVote(-1)}>Down vote</button> 
        </div>
      </div>
    </div>
  }
  
  function MountComments(){
    return comments.map(comment => {
      return <div style={{background:'grey'}}>
        <h5 style={{textAlign:'center'}}>{comment.username}</h5>
        <p style={{textAlign:'center'}}>{comment.text}</p>
        <div style={{display:'flex', justifyContent:"space-around"}}>
          <button onClick={() => PutCommentVote(1, comment.id)}>Up vote</button> 
          <p>{comment.votesCount}</p>
          <button onClick={() => PutCommentVote(-1, comment.id)}>Down vote</button> 
        </div>
      </div>
    })
  }
  
  return (
    <main>
      {MountPost()}
      <div>
        <input type='text' placeholder='Escreva seu comentario' value={comment} onChange={e => setComment(e.target.value)}></input>
        <button onClick={SendComment}>Enviar comentario</button> 
      </div>
      {MountComments()}
    </main>
    )
  }
  
  export default CommentPage
  