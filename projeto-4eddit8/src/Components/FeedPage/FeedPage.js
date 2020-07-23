import React, {useState, useEffect} from 'react'
import Form from './Form'
import { StylesProvider } from '@material-ui/core/styles';
import PostsCard from '../PostsCard/PostsCard'
import {useProtectedPage} from '../../Hooks/useProtectedPage'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {
  Main,
  InputNewPost,
  ButtonNewPost,
  LogOutButton
} from './style'

function PostsPage() {
  const [postList, setPostList] = useState([])
  const [vote, setVote] = useState(true)

  const history = useHistory()

  useProtectedPage()

  useEffect(() =>  {
    getPosts()
  }, [postList, vote])

  function onClickLogOut() {
    localStorage.removeItem('token')
    history.push('/')
  }

  function onClickPost(id) {
    console.log(id)
    history.push('/Post/' + id)
  }

  function getPosts() {
    const userToken = localStorage.getItem("token")
    const headers = {
      Authorization: userToken
    }
    axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', {headers})
      .then((response) => {
        setPostList(response.data.posts)
      })
      .catch((error) => {
        userToken && alert(error)
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

  return (
    <StylesProvider injectFirst>
      <Main>
        <h2>Página de Feed</h2> 
        <LogOutButton
          size='large'
          onClick={onClickLogOut}>
          Logout
        </LogOutButton>
        <Form />
        {postList.length === 0 ? <p>Carregando Posts...</p> : postList.map((post) => {
          return (
          <section key={post.id}>
            <PostsCard
              onClickPost={() => onClickPost(post.id)} 
              upVote={() => postVote(post.id, +1)}
              downVote={() => postVote(post.id, -1)}
              user={post.username}
              text={post.text}
              commentsCount={post.commentsCount}
              votesCount={post.votesCount}
            />
          </section>)
        })}
      </Main>
    </StylesProvider>
  )
}

export default PostsPage
