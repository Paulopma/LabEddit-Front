import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, Avatar,  } from "@material-ui/core";
import { LoginForm, ButtonRegister, useStyles} from "./styled";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const baseUrl =
  "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login";

function LoginPage() {
  const classes = useStyles()
  let history = useHistory()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = (event) => {
    event.preventDefault();

    const body = {
      email: email,
      password: password,
    };
    axios
      .post(baseUrl, body)
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        history.push('/timeline')
        setEmail("")
        setPassword("")
        alert("Usuário logado");
      })

      .catch((error) => {
        alert("Email ou senha incorreta");
      });
  };

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      <Typography variant="h4" align={"center"} gutterBottom>
      LabEddit
      </Typography>
      
      <LoginForm onSubmit={onSubmitLogin}>
        <TextField
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          label={"Email"}
          type={"email"}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          onChange={onChangePassword}
          value={password}
          name={"password"}
          label={"Senha"}
          type={"password"}
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <Button variant={"contained"} className={classes.submit} fullWidth color="primary" type={"submit"}>
        Entrar
        </Button>
      </LoginForm>
     
      <ButtonRegister>
        <Link to={"/register"} >
          <Button variant={"outlined"} className={classes.register} fullWidth color="secondary" type={"submit"}>
          Criar conta
          </Button>
        </Link>
      </ButtonRegister>
      </div>
    </Container>
  );
}

export default LoginPage;

