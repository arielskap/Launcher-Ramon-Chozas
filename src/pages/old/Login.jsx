import React from 'react';
import '../assets/styles/login.css';
import { Link } from 'react-router-dom';
import logoChozas from '../assets/static/logo_chozas.png';
import logoChozas2 from '../assets/static/logo_chozas2.png';

const Login = () => {

  //verificar usuario y contraseña
  const login = (response) => {
    const obj = JSON.parse(response);
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    for (let i = 0;i < obj.Registrados.length;i++) {
      if (user === obj.Registrados[i].user && password === obj.Registrados[i].password) {
        document.getElementById('aviso').style.visibility = 'hidden';
        window.location.href = 'menu.html';
      }
    }
  };

  const ajaxGetJson = () => {
    let xmlhttp;
    if (window.XMLHttpRequest) {
      //El explorador implementa la interfaz de forma nativa
      xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      //El explorador permite crear objetos ActiveX
      try {
        xmlhttp = new ActiveXObject('MSXML2.XMLHTTP');
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {}
      }
    }
    if (!xmlhttp) {
      alert('No ha sido posible crear una instancia de XMLHttpRequest');
    }
    const url = 'json/login.json';

    xmlhttp.onreadystatechange = (a) => {
      console.log(a);
      const { readyState, status, responseText } = this;
      if (readyState === 4 && status === 200) {
        // Typical action to be performed when the document is ready:
        login(responseText);
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  };

  //Comprobar error
  let exit = 3;
  const error = () => {
    exit--;
    if (exit === 0) {
      document.location.reload(true);
    } else {
      document.getElementById('aviso').style.visibility = 'visible';
      document.getElementById('aviso').innerText = `Incorrecto. ¡Le queda ${exit} intentos!`;
      if (exit === 1) {
        document.getElementById('aviso').innerText = 'Incorrecto. ¡Le queda un intento!';
      }
    }
  };

  return (
    <section className='wrapper'>
      <main id='main'>
        <div id='inicio'>
          <div id='imgChozas'>
            <img alt='chozas' src={logoChozas2} />
          </div>
          <div>
            <h1 id='titulo'>
              Ramón Chozas S.A
            </h1>
          </div>
          <div id='divButton'>
            <Link to='/home'>
              <button type='button' id='button' className='button'><span>¡Acceder!</span></button>
            </Link>
          </div>
        </div>
        <div id='login' className='login'>
          <form onSubmit={() => {
            ajaxGetJson();
            return false;
          }}
          >
            <div className='container'>
              <div id='header'>
                <div>
                  <img alt='chozas' src={logoChozas} />
                </div>
                <h1>Login</h1>
                <div>
                  <img alt='chozas' id='imgNoVisible' src={logoChozas} />
                </div>
              </div>
              <hr />
              <div className='divsForm'>
                <label htmlFor='user'>
                  <b>Usuario:</b>
                  <input type='text' placeholder='Ingrese Usuario' id='user' name='user' maxLength='15' required />
                </label>
              </div>
              <div className='divsForm'>
                <label htmlFor='psw'>
                  <b>Contraseña:</b>
                  <input type='password' placeholder='Ingrese Contraseña' id='password' name='psw' maxLength='15' required />
                </label>
              </div>
              <hr />
              <button type='submit' className='loginbtn' onClick={error}>Iniciar Sesion</button>
              <p id='aviso' />
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Login;
