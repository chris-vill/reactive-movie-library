import React, { createElement, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import classes from './Login.sass';
import { Button, TextInput, LoadingSpinner } from '@components';
import { AuthContext } from '@context/Auth';

const Login = ({ extClass = "" }) => {
  const [ auth, isLoading, setLogin ] = useContext(AuthContext);
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  async function login(ev) {
    ev.preventDefault();
    setLogin(credentials);
  }

  return (
    <section className={ classNames(classes["login"], extClass) }>
      <form>
        {
          isLoading
            ? <LoadingSpinner/>
            : <>
              <TextInput text="Username" name="username" value={ credentials } onChange={ setCredentials } extClass={ classes["username-field"] }/>
              <TextInput text="Password" name="password" value={ credentials } onChange={ setCredentials } type="password"/>
              <Button text="Login" onClick={ login } extClass={ classes["login-btn"] }/>
            </>
        }
      </form>
    </section>
  );
}

export default withRouter(Login);
