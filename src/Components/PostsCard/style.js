import styled from 'styled-components'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

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
export const TextContainer = styled.div`
  display: flex;
  min-height: 100px;
  p {
    text-align: left;
    margin-left: 30px;
  }
  background-color: whitesmoke;
  width: inherit;
  cursor: pointer;
`
export const Main = styled.main`
  display: flex;
  justify-content: center;
`
export const CardContainer = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 300px;
  section {
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
export const ThumbUpIcon = styled(ThumbUpAltOutlinedIcon)`
  cursor: pointer;
`
export const ThumbDownIcon = styled(ThumbDownOutlinedIcon)`
  cursor: pointer;
`