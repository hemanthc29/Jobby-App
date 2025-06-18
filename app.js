import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import JobItemDetails from './Components/JobItemDetails'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Components/NotFound'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App