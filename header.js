import {Link, useHistory, withRouter} from 'react-router-dom'
import {TiHome} from 'react-icons/ti'
import {FiLogOut} from 'react-icons/fi'
import {FaBriefcase} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const history = useHistory()
  const {location} = props
  const currentPath = location.pathname

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div className="largeDeviceContainer">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="lDeviceLogo"
          />
        </Link>

        <ul className="largenavtabs">
          <li className={tabs ${currentPath === '/' ? 'active' : ''}}>
            <Link to="/">Home</Link>
          </li>
          <li className={tabs ${currentPath === '/jobs' ? 'active' : ''}}>
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>

        <div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="smallDevicesContainer">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="sDeviceLogo"
          />
        </Link>

        <ul className="nav-icons">
          <li className={currentPath === '/' ? 'active' : ''}>
            <Link to="/">
              <TiHome size={20} />
            </Link>
          </li>
          <li className={currentPath === '/jobs' ? 'active' : ''}>
            <Link to="/jobs">
              <FaBriefcase size={20} />
            </Link>
          </li>
          <li>
            <button type="button" className="icon-btn" onClick={handleLogout}>
              <FiLogOut size={20} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)