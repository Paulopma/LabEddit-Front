import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  display: grid;
  gap: 8px;
`;

export const LoginForm =styled.form`
    display: grid;
    gap: 8px;
`

export const ButtonRegister = styled.div`
    display: grid;
grid-auto-flow: column;
gap: 16px;

  a {
    text-decoration: none
}

`;

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    width: 300,
  },
  register: {
    margin: theme.spacing(1, 0, 2),
    width: 300,
  },
}));
