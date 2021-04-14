import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import classes from './Login.sass';
import { Button, TextInput } from '@components';
import { AuthContext } from '@context/Auth';
import TMDB from '@core/tmdb';
import { LoadingSpinner } from '@components';

const Login = ({ callback, extClass = "" }) => {
  const [ _, setAuth ] = useContext(AuthContext);
  const [ isLoading, setToLoading ] = useState(false);
  const [ fields, setInput ] = useState({
    username: '',
    password: ''
  });

  const FormContent = isLoading
    ? <LoadingSpinner/>
    : <>
      <TextInput text="Username" name="username" value={ fields.username } onChange={ onInputChange } extClass={ classes["username-field"] }/>
      <TextInput text="Password" name="password" value={ fields.password } onChange={ onInputChange } type="password"/>
      <Button text="Login" onClick={ login } extClass={ classes["login-btn"] }/>
    </>

  async function login(ev) {
    ev.preventDefault();
    setToLoading(true);

    const response = await TMDB.login(fields);
    setAuth(response);
    setToLoading(false);
    callback(true);
  }

  function onInputChange({ target: { name, value } }) {
    setInput(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  }

  return (
    <section className={ classNames(classes["login"], extClass) }>
      <form>
        { FormContent }
      </form>
    </section>
  );
}

export default Login;
