import {useEffect, useState, useCallback} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileSection = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  const getProfile = useCallback(async () => {
    setApiResponse({
      status: apiStatusConstants.inProgress,
      data: null,
      errorMsg: null,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
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
          data: data.profile_details,
          errorMsg: null,
        })
      } else {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: data.error_msg,
        })
      }
    } catch {
      setApiResponse({
        status: apiStatusConstants.failure,
        data: null,
        errorMsg: 'Something went wrong. Try again.',
      })
    }
  }, [])

  useEffect(() => {
    getProfile()
  }, [getProfile])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccessView = () => {
    const {data} = apiResponse
    return (
      <div className="profileSection">
        <img
          src={data.profile_image_url}
          alt="profile"
          className="employeURL"
        />

        <h1 className="employeeName">{data.name}</h1>
        <p className="bio">{data.short_bio}</p>
      </div>
    )
  }

  const renderFailureView = () => (
    <div className="retry-container">
      <p className="error-message">{apiResponse.errorMsg}</p>
      <button type="button" onClick={getProfile}>
        Retry
      </button>
    </div>
  )

  const getTheProfileContainer = () => {
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

  return <div>{getTheProfileContainer()}</div>
}

export default ProfileSection