import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, TextField, Avatar } from "@material-ui/core";
import { RegisterForm, Container, useStyles, Login } from "./styled";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";

const baseUrl =
  "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup";

function RegisterPage() {
  const classes = useStyles();
  let history = useHistory();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const createdUser = (event) => {
    event.preventDefault();

    const body = {
      email: email,
      password: password,
      username: username,
    };
    axios
      .post(baseUrl, body)
      .then((response) => {
        alert("Usuário cadastrado");
        window.localStorage.setItem("token", response.data.token);
        history.push("/timeline");
        setUserName("");
        setEmail("");
        setPassword("");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Usuário não foi cadastrado");
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
        Cadastre-se
        </Typography>
        <RegisterForm onSubmit={createdUser}>
          <TextField
            onChange={onChangeUserName}
            value={username}
            name={"username"}
            label={"Nome do usuário"}
            type={"text"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
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
          <Button
            variant={"contained"}
            className={classes.submit}
            color="primary"
            type={"submit"}
          >
           Cadastrar
          </Button>
        </RegisterForm>

        <Login>
          Já tem uma conta?
          <Link to={"/"}>Entrar</Link>
        </Login>
      </div>
    </Container>
  );
}

export default RegisterPage;

