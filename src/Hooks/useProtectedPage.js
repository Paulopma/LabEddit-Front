import {useEffect} from 'react'
import { useHistory } from 'react-router-dom'

export function useProtectedPage() {
  const history = useHistory()
  useEffect(() => {
    const userToken = localStorage.getItem('token')
    if(!userToken) {
      alert('você precisa estar logado para acessar sua timeline') 
      history.push('/')
    }
  }, [history])
}