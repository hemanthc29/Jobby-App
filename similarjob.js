import {Link} from 'react-router-dom'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    jobDescription,
  } = jobDetails

  const expandedDescription = ${jobDescription} The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.

  return (
    <li className="similar-job-item">
      <Link to={/jobs/${id}} className="similar-job-link">
        <div className="similar-job-card">
          <div className="job-header">
            <div className="company-logo-container">
              <img
                src={companyLogoUrl}
                alt="similar job company logo"
                className="company-logo"
              />
            </div>
            <div className="job-title-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <span className="star-icon">★</span>
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>

          <h3 className="section-title">Description</h3>
          <p className="job-description">{expandedDescription}</p>

          <div className="location-type-container">
            <div className="info-item">
              <span className="location-icon">📍</span>
              <p className="info-text">{location}</p>
            </div>
            <div className="info-item">
              <span className="job-type-icon">💼</span>
              <p className="info-text">{employmentType}</p>
            </div>
          </div>

          <div className="additional-info">
            <p className="apply-text">
              Perfect for candidates with 3+ years of experience
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobCard