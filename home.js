import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />
      <div className="HomeContainer">
        <div className="container">
          <h1 className="Homeheading">Find The Job That Fits Your Life</h1>
          <p className="homepara">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <div>
            <Link to="/jobs">
              <button type="button" className="homebtn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home