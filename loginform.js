import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMSg, setErrorMsg] = useState({status: false, data: ''})
  const history = useHistory()

  const jwtoken = Cookies.get('jwt_token')
  if (jwtoken !== undefined) {
    return <Redirect to="/" />
  }

  const onSumbitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSumbitFailure = errorMsg => {
    setErrorMsg({status: true, data: errorMsg})
    console.log(errorMsg)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data, response.ok)
    if (response.ok) {
      onSumbitSuccess(data.jwt_token)
    } else {
      onSumbitFailure(data.error_msg)
    }
  }

  const renderUsername = () => (
    <>
      <label htmlFor="username">USERNAME</label>
      <input
        type="text"
        value={username}
        placeholder="Username"
        id="username"
        onChange={event => setUsername(event.target.value)}
      />
    </>
  )

  const renderPassword = () => (
    <>
      <label htmlFor="password">PASSWORD</label>
      <input
        type="password"
        value={password}
        placeholder="Password"
        id="password"
        onChange={event => setPassword(event.target.value)}
      />
    </>
  )

  return (
    <div className="LoginContainer">
      <div className="cardContainer">
        <div className="logoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">{renderUsername()}</div>
          <div className="inputContainer">{renderPassword()}</div>
          <div className="buttonContainer">
            <button type="submit">Login</button>
          </div>
          {errorMSg.status && <p className="errormsg">*{errorMSg.data}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm