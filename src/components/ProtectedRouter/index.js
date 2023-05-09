import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRouter = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route path="/" {...props} />
}
export default ProtectedRouter
