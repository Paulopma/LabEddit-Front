import React, { useState, useEffect } from "react";
import axios from "axios";
import { StylesProvider } from '@material-ui/core/styles'
import {
  MakeComment,
  InputComment,
  Main,
  UserContainer,
  PostContainer,
  TextContainer,
  ThumbDownIcon,
  ThumbUpIcon,
  Comments
} from './style'

function CommentPage({
    match: {
      params: { id },
    },
  }) {

  const [post, setPost] = useState({})
  const [comments, setComments] = useState([0])
  const [comment, setComment] = useState('')
  const [refresh, setRefresh] = useState(0);
  const [vote, setVote] = useState(true)

  useEffect(() => {
    GetComments();
  }, [refresh, vote]);

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

  function postVote(postId, direction) {
    const body = {
      direction: direction
    }
    const headers = {
      Authorization: localStorage.getItem("token")
    }
    axios.put('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/' + postId + '/vote', body, {headers})
      .then((response) => {
        setVote(!vote)
      })
      .catch((error) => {
        alert(error)
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
    return post && 
    <PostContainer>
      <UserContainer>
        <h4>{post.username}</h4>
      </UserContainer>
      <TextContainer>
          <h4>{post.title}</h4>
          <p>{post.text}</p>
      </TextContainer>
      <section>
        <div>
          <ThumbUpIcon onClick={() => postVote(post.id, +1)} color='primary' />
            <span>{post.votesCount}</span>
          <ThumbDownIcon onClick={() => postVote(post.id, -1)} color='primary' />
        </div>
      </section>
    </PostContainer>
  }
  
  function MountComments(){
    return comments.map(comment => {
      return( 
      <Comments>
        <h4>{comment.username}</h4>
        <p>{comment.text}</p>
        <section>
          <div>
            <ThumbUpIcon onClick={() => PutCommentVote(1, comment.id)} color='primary' />
              <span>{comment.votesCount}</span>
            <ThumbDownIcon onClick={() => PutCommentVote(-1, comment.id)} color='primary' />
          </div>
        </section>
      </Comments>)
    })
  }
  
  return (
    <StylesProvider injectFirst>
    <Main>
      {MountPost()}
      <div>
        <InputComment 
          type='text' 
          placeholder='Escreva seu comentario' 
          value={comment} 
          onChange={e => 
          setComment(e.target.value)} 
          variant='outlined'
          multiline
          rows={3}
        />
        <MakeComment 
          onClick={SendComment}
          variant='outlined'
          color='primary'>
          Enviar comentario
        </MakeComment> 
      </div>
      {MountComments()}
    </Main>
    </StylesProvider>
    )
  }
  
  export default CommentPage
  