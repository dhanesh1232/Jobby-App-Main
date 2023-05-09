import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    errorMsg: '',
    username: '',
    password: '',
    displayError: false,
  }

  // Update JWT_Token Success View
  onSubmitSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  // render ErrorMessage
  onSubmitFailureView = errorMsg => {
    this.setState({displayError: true, errorMsg})
  }

  // OnSubmit LoginForm Data
  onChangeUsername = event => {
    console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    console.log(event.target.value)
    this.setState({password: event.target.value})
  }

  onSubmitLoginData = async event => {
    event.preventDefault()

    const loginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccessView(data.jwt_token)
    } else {
      this.onSubmitFailureView(data.error_msg)
    }
  }

  render() {
    const {errorMsg, displayError, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form className="my-form" onSubmit={this.onSubmitLoginData}>
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input-holder"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input-holder"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {displayError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
