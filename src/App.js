import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRouter from './components/ProtectedRouter'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'
import LoginForm from './components/LoginFrom'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
// Replace your code here
const App = () => (
  <div className="home-container-page">
    <Switch>
      <Route path="/login" component={LoginForm} />
      <ProtectedRouter exact path="/" component={Home} />
      <ProtectedRouter exact path="/jobs" component={Jobs} />
      <ProtectedRouter exact path="/jobs/:id" component={JobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
