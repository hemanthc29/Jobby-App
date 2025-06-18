import {useEffect, useState, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItemCard from '../JobItemCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobsList = ({employmentTypes, salaryRange, searchQuery}) => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: [],
    errorMsg: null,
  })

  const getJobs = useCallback(async () => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: [],
      errorMsg: null,
    })

    const jwtToken = Cookies.get('jwt_token')
    const typesQuery = employmentTypes.join(',')
    const url = https://apis.ccbp.in/jobs?employment_type=${typesQuery}&minimum_package=${salaryRange}&search=${searchQuery}

    const options = {
      method: 'GET',
      headers: {
        Authorization: Bearer ${jwtToken},
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        setApiResponse({
          status: apiStatusConstants.success,
          data: data.jobs,
          errorMsg: null,
        })
      } else {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: [],
          errorMsg: data.error_msg,
        })
      }
    } catch (error) {
      setApiResponse({
        status: apiStatusConstants.failure,
        data: [],
        errorMsg: 'Network error. Please try again.',
      })
    }
  }, [employmentTypes, salaryRange, searchQuery])

  useEffect(() => {
    getJobs()
  }, [getJobs])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiResponse

    if (data.length === 0) {
      return (
        <div className="failureContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }

    const updatedData = data.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    return (
      <ul className="jobs-list">
        {updatedData.map(each => (
          <JobItemCard key={each.id} jobdetails={each} />
        ))}
      </ul>
    )
  }

  const renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        {apiResponse.errorMsg ||
          'We cannot seem to find the page you are looking for.'}
      </p>
      <button type="button" onClick={getJobs}>
        Retry
      </button>
    </div>
  )

  const getTheJobsList = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div className="jobsSectionMainConainer">{getTheJobsList()}</div>
}

export default JobsList