import {Link} from 'react-router-dom'
import './index.css'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'

const JobItemCard = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobdetails
  return (
    <Link to={/jobs/${id}} className="nounderline">
      <li className="jobcard">
        <div className="company-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logoses"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-details">
          <div className="location-type-container">
            <div className="location-container">
              <IoLocationSharp className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="type-container">
              <FaBriefcase className="briefcase-icon" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="divider" />
        <div className="description-container">
          <h3 className="description-heading">Description</h3>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItemCard