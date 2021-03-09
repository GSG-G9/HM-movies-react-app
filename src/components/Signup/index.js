import React, { Component, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import firebase from '../../firebase'
import {authContext} from "../Context"

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUsername = this.handleUsername.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
	}

	async handleSubmit(event) {
		event.preventDefault();
		const {
			history: { push },
			handleAuthentication,
		} = this.props;
		const {
			target: [
				{ value: username },
				{ value: email },
				{ value: password },
				{ value: confirmPassword },
			],
		} = event;
		if (
			!username.trim() &&
			!email.trim() &&
			!password.trim() &&
			!confirmPassword.trim()
		) {
			return this.setState({ errors: 'You have to fill all fields ..' });
		}

		if (password !== confirmPassword) {
			return this.setState({ errors: 'Your Passwords should be identical' });
		}
		
		await firebase.auth().createUserWithEmailAndPassword(email,password);
		handleAuthentication(true);
		return push('/movies');
	}

	handleUsername(event) {
		const {
			target: { value },
		} = event;
		this.setState({ username: value });
	}

	handleEmail(event) {
		const {
			target: { value },
		} = event;
		this.setState({ email: value });
	}

	handlePassword(event) {
		const {
			target: { value },
		} = event;
		this.setState({ password: value });
	}

	handleConfirmPassword(event) {
		const {
			target: { value },
		} = event;
		this.setState({ confirmPassword: value });
	}

	render() {
		const { confirmPassword, email, password, username, errors } = this.state;
		return (
  <div className='signup-form-container'>
    <h2 className='add-user-header'>Create New User</h2>
    <form onSubmit={this.handleSubmit} className='signup-form'>
      <div className='add-movie-input-row'>
        <label htmlFor='username'>User Name</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={this.handleUsername}
          placeholder='Enter Your user name...'
        />
      </div>
      <div className='add-movie-input-row'>
        <label htmlFor='Email'>Email</label>
        <input
          type='email'
          id='username'
          placeholder='Enter Your email...'
          value={email}
          onChange={this.handleEmail}
        />
      </div>
      <div className='add-movie-input-row'>
        <label htmlFor='Email'>Password</label>
        <input
          type='Password'
          id='Password'
          placeholder='Enter Your Password...'
          value={password}
          onChange={this.handlePassword}
        />
      </div>
      <div className='add-movie-input-row'>
        <label htmlFor='Email'>Confirm Password</label>
        <input
          type='Password'
          id='Password'
          placeholder='Please Confirm Your Password...'
          value={confirmPassword}
          onChange={this.handleConfirmPassword}
        />
      </div>
      <p>
        Are You Registered ?...
        <Link to='/login'>Login Here !!</Link>
      </p>
      {errors ? <p className='signup-error'>{errors}</p> : null}
      <input
        className='submit-signup-button'
        type='submit'
        value='Register'
      />
    </form>
  </div>
		);
	}
}

SignUp.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	handleAuthentication:PropTypes.func.isRequired
};

function HighOrderSignUp(props) {
	const { isAuth } = useContext(authContext);
	if (!isAuth) {
		return <SignUp {...props} />;
	}
	return <Redirect to='/movies' />;
}

HighOrderSignUp.propTypes = {
	handleAuthentication:PropTypes.func.isRequired
};

export default HighOrderSignUp;
