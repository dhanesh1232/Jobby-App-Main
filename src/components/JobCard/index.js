import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobItemCard} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItemCard
  return (
    <Link to={`/jobs/${id}`}>
      <li className="nav-job-link">
        <div className="job-card-top">
          <div className="job-card-header">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="company-info-header">
              <h1 className="company-title">{title}</h1>
              <div className="company-rating">
                <AiFillStar className="star-icon" />
                <p className="rating-star">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-card-footer">
            <div className="location-and-employment-type">
              <div className="location">
                <MdLocationOn className="location-icon" />
                <p className="location-def">{location}</p>
              </div>
              <div className="emp-info">
                <BsBriefcaseFill className="emp" />
                <p className="emp-def">{employmentType}</p>
              </div>
            </div>
            <p className="salary-pack">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="separator-job" />
        <div className="job-description-section">
          <h1 className="def-head">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
