import {useState, useEffect, useCallback} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const JobItemDetails = props => {
  const [apiState, setApiState] = useState({
    status: apiStatusConstants.initial,
    jobData: null,
    similarJobs: [],
    error: null,
  })

  const {match} = props
  const {id} = match.params

  const getJobData = useCallback(async () => {
    setApiState(prev => ({...prev, status: apiStatusConstants.inProgress}))
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = https://apis.ccbp.in/jobs/${id}

    const options = {
      method: 'GET',
      headers: {
        Authorization: Bearer ${jwtToken},
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        const job = data.job_details
        const updatedJobData = {
          companyLogoUrl: job.company_logo_url,
          companyWebsite: job.company_website_url,
          title: job.title,
          rating: job.rating,
          location: job.location,
          jobDescription: job.job_description,
          employmentType: job.employment_type,
          packagePerAnnum: job.package_per_annum,
          skills: job.skills.map(skill => ({
            name: skill.name,
            imageUrl: skill.image_url,
          })),
          lifeAtCompany: {
            description: job.life_at_company.description,
            imageUrl: job.life_at_company.image_url,
          },
        }

        const updatedSimilarJobs = data.similar_jobs.map(jobs => ({
          id: jobs.id,
          title: jobs.title,
          location: jobs.location,
          rating: jobs.rating,
          jobDescription: jobs.job_description,
          companyLogoUrl: jobs.company_logo_url,
          employmentType: jobs.employment_type,
        }))

        setApiState({
          status: apiStatusConstants.success,
          jobData: updatedJobData,
          similarJobs: updatedSimilarJobs,
          error: null,
        })
      } else {
        setApiState({
          status: apiStatusConstants.failure,
          jobData: null,
          similarJobs: [],
          error: data.error_msg,
        })
      }
    } catch (error) {
      setApiState({
        status: apiStatusConstants.failure,
        jobData: null,
        similarJobs: [],
        error: 'Something went wrong',
      })
    }
  }, [id])

  useEffect(() => {
    getJobData()
  }, [getJobData])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={() => getJobData()}
      >
        Retry
      </button>
    </div>
  )

  const renderSkillsList = skills => (
    <div className="skills-container">
      <h3 className="section-title">Skills</h3>
      <ul className="skills-list">
        {skills.map(skill => (
          <li key={skill.name} className="skill-item">
            <img src={skill.imageUrl} alt={skill.name} className="skill-icon" />
            <p className="skill-name">{skill.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderLifeAtCompany = lifeAtCompany => (
    <div className="life-at-company-container">
      <h3 className="section-title">Life at Company</h3>
      <div className="life-at-company-content">
        <div className="life-at-company-text">
          <p className="life-at-company-description">
            {lifeAtCompany.description}
          </p>
          <p className="company-values">
            Our core philosophy is people over process. Our culture has been
            instrumental to our success. It has helped us attract and retain
            stunning colleagues, making work here more satisfying.
            Entertainment, like friendship, is a fundamental human need, and it
            changes how we feel and gives us common ground. We want to entertain
            the world.
          </p>
        </div>
        <img
          src={lifeAtCompany.imageUrl}
          alt="life at company"
          className="life-at-company-image"
        />
      </div>
    </div>
  )

  const renderJobDetails = () => {
    const {jobData, similarJobs} = apiState
    const {companyWebsite} = jobData

    const expandedDescription = ${jobData.jobDescription} We are looking for a ${jobData.title} with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support.

    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-header">
            <div className="company-logo-container">
              <img
                src={jobData.companyLogoUrl}
                alt="job details company logo"
                className="company-logos"
              />
            </div>
            <div className="job-title-container">
              <h1 className="job-title">{jobData.title}</h1>
              <div className="rating-container">
                <span className="star-icon">★</span>
                <p className="rating">{jobData.rating}</p>
              </div>
            </div>
          </div>

          <div className="job-info-container">
            <div className="location-type-container">
              <div className="info-item">
                <span className="location-icon">📍</span>
                <p className="info-text">{jobData.location}</p>
              </div>
              <div className="info-item">
                <span className="job-type-icon">💼</span>
                <p className="info-text">{jobData.employmentType}</p>
              </div>
            </div>
            <p className="package">{jobData.packagePerAnnum}</p>
          </div>

          <hr className="separator" />

          <div className="description-container">
            <div className="description-header">
              <h3 className="section-title">Description</h3>
              <a
                href={companyWebsite}
                className="visit-link"
                target="_blank"
                rel="noreferrer"
              >
                Visit <span className="visit-icon">↗</span>
              </a>
            </div>
            <p className="job-description">{expandedDescription}</p>
          </div>

          {renderSkillsList(jobData.skills)}
          {renderLifeAtCompany(jobData.lifeAtCompany)}
        </div>

        <div className="similar-jobs-section">
          <h2 className="similar-jobs-heading">Similar Jobs</h2>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <SimilarJobCard key={job.id} jobDetails={job} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    const {status} = apiState

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderJobDetails()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <Header />
      <div className="job-details-page">{renderContent()}</div>
    </div>
  )
}

export default withRouter(JobItemDetails)