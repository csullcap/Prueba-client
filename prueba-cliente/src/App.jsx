import { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [token, settoken] = useLocalStorage("token", "");
  const message_r = useRef(null);
  const message_l = useRef(null);
  const token_l = useRef(null);
  const result_p = useRef(null);
  const result_logout = useRef(null);

  useEffect(() => {}, []);

  const sumbit_Login = (e) => {
    e.preventDefault();
    const email = e.target.email_l.value;
    const password = e.target.contrasena_l.value;

    axios
      .post(
        "http://127.0.0.1:8000/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(
        (res) => {
          message_l.current.innerHTML = res.data.message;
          if (res.data.access_token !== undefined) {
            settoken(res.data.access_token);
            token_l.current.innerHTML = res.data.access_token;
          }
        },
        (err) => {
          message_l.current.innerHTML = err.response.data.message;
        }
      );
  };

  const sumbit_Register = (e) => {
    e.preventDefault();
    const name = e.target.nombre_r.value;
    const email = e.target.email_r.value;
    const password = e.target.contrasena_r_1.value;
    const password_confirmation = e.target.contrasena_r_2.value;

    axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          name,
          email,
          password,
          password_confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(
        (res) => {
          message_r.current.innerHTML = res.data.message;
        },
        (err) => {
          message_r.current.innerHTML = err.response.data.message;
        }
      );
  };

  const ver_perfil = () => {
    axios
      .get("http://127.0.0.1:8000/api/user-profile", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(
        (res) => {
          result_p.current.innerHTML = JSON.stringify(res.data.data);
        },
        (err) => {
          result_p.current.innerHTML = err.response.data.message;
        }
      );
  };

  const logout = () => {
    axios
      .get("http://127.0.0.1:8000/api/logout", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(
        (res) => {
          result_logout.current.innerHTML = res.data.message;
        },
        (err) => {
          result_logout.current.innerHTML = err.response.data.message;
        }
      );
  };

  return (
    <>
      <p>Registro</p>
      <form onSubmit={sumbit_Register}>
        <label htmlFor="nombre_r">Nombre </label>
        <input type="text" id="nombre_r" />
        <br />
        <label htmlFor="email-r">Email </label>
        <input type="email" id="email_r" />
        <br />
        <label htmlFor="contrasena-r-1">Contraseña </label>
        <input type="password" id="contrasena_r_1" />
        <br />
        <label htmlFor="contrasena-r-2">Confirmación Contraseña </label>
        <input type="password" id="contrasena_r_2" />
        <br />
        <p ref={message_r}></p>
        <button>Resgistrarse</button>
      </form>
      <hr />
      <p>Login</p>
      <form onSubmit={sumbit_Login}>
        <label htmlFor="email_l">Email </label>
        <input type="email" id="email_l" />
        <br />
        <label htmlFor="contrasena_l">Contraseña </label>
        <input type="password" id="contrasena_l" />
        <br />
        <p ref={message_l}></p>
        <p ref={token_l}></p>
        <button>Iniciar sesion</button>
      </form>

      <hr />
      <p>Ver Perfil</p>
      <button onClick={() => ver_perfil()}> Enviar Token</button>
      <p ref={result_p}></p>
      <hr />
      <p>Cerrar sesion</p>
      <button onClick={() => logout()}> Enviar Token</button>
      <p ref={result_logout}></p>
    </>
  );
}

export default App;
