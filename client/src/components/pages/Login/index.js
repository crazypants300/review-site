import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../utils/mutations';
import Auth from '../../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };



  const handleLogin = (e) => {
    const loginEl = document.querySelector('.login-container');
    const signUpEl = document.querySelector('.sign-up-container');
    if (!signUpEl.classList.contains('is-hidden')) {
      signUpEl.classList.toggle('is-hidden');
    }
    loginEl.classList.toggle('is-hidden');
  }

  return (
    <div className="write-position is-hidden mobile-p login-container signup-bg">
      <div className="field">
        <div className='is-flex is-justify-content-space-between'>
          <h1 className="title">Login</h1>
          <button className='delete' onClick={handleLogin}></button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-1'>
            <input
              className="input"
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className='mb-1'>
            <input
              className="input"
              placeholder="******"
              name="password"
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <button className="button b-hov has-text-black" type="submit">
            Submit
          </button>
        </form>

        {error && <div>Login failed</div>}
      </div>
    </div>

  );
};

export default Login;