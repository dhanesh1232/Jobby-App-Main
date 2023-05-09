import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ImHome} from 'react-icons/im'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onLogoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
      </li>
      <ul className="desktop-view">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>

      <button type="button" className="desktop-btn" onClick={onLogoutUser}>
        Logout
      </button>
      <div className="nav-menu">
        <div className="mobile-view">
          <Link to="/" className="nav-link">
            <ImHome />
          </Link>
          <Link to="/jobs" className="nav-link">
            <BsBriefcaseFill />
          </Link>
        </div>
        <button type="button" className="mobile-btn" onClick={onLogoutUser}>
          <FiLogOut />
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
