import React, {useState} from 'react'
import axios from 'axios'
import {
  ButtonNewPost,
  InputNewPost
} from './style'

function Form(props) {

  const [newPostInput, setNewPostInput] = useState('')

  function onClickNewPost(event) {
    event.preventDefault()
    const headers = {
      Authorization: localStorage.getItem("token")
    }
    const body = {
      text: newPostInput,
      title: 'um post qualquer'
    }
    console.log(body)
    axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', body, {headers})
      .then((response) => {
        alert('post criado com sucesso')
        setNewPostInput('')
      })
      .catch((error) => {
        alert(error)
      })
  }
  function onChangeNewPostInput(event) {
    setNewPostInput(event.target.value)
  }

  return(
    <form onSubmit={onClickNewPost}>
    <InputNewPost 
      type='text'
      value={newPostInput}
      placeholder='quais as novidades?' 
      variant='outlined' 
      multiline
      rows={3}
      onChange={onChangeNewPostInput}
    />
    <ButtonNewPost
      type='submit'
      color='primary' 
      variant='outlined'>
      Postar
    </ButtonNewPost>
    </form>
  )
}

export default Form
