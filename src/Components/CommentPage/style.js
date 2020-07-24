import styled from 'styled-components'
import {Button, TextField} from '@material-ui/core'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

export const Comments = styled.div`
  background-color: whitesmoke;
  p {
    text-align: justify;
    word-break: break-all;
    max-width: 240px;
    text-align: left;
    margin-left: 30px;
    margin-right: 30px;
  }
  h4 {
    margin-top: 30px;
    margin-left: 20px;
  }
  section {
    margin-left: 20px;
    height: 50px;
    display: flex;
    div {
      margin-bottom: 24px;
      span {
        margin-right: 4px;
        margin-left: 4px;
      }
      width: 100px;
      display: flex;
      justify-content: space-evenly;
    }
  }
`
export const InputComment = styled(TextField)`
  width: 300px;
  margin-top: 8px;
  margin-bottom: 8px;
`
export const MakeComment = styled(Button)`
  width: 300px;
`
export const Main = styled.main`
  width: 300px;
`
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  width: inherit;
  height: 40px;
  h4 {
    color: blue;
    text-align: left;
    margin-left: 30px;
  }
`
export const PostContainer = styled.div`
  width: 50px;
  min-height: 100px;
  p, h4 {
    text-align: left;
    margin-left: 30px;
  }
  background-color: whitesmoke;
  width: inherit;
  section {
    margin-left: 20px;
    height: 50px;
    display: flex;
    div {
      margin-bottom: 24px;
      span {
        margin-right: 4px;
        margin-left: 4px;
      }
      width: 100px;
      display: flex;
      justify-content: space-evenly;
    }
  }
`
export const TextContainer = styled.div`

`
export const ThumbUpIcon = styled(ThumbUpAltOutlinedIcon)`
  cursor: pointer;
`
export const ThumbDownIcon = styled(ThumbDownOutlinedIcon)`
  cursor: pointer;
`
