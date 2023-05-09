import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const AboutJob = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
  } = jobDetails[0]
  return (
    <div className="about-card-company">
      <div className="about-top">
        <div className="about-top-header">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-details-job"
          />
          <div className="about-company-job-head">
            <h1 className="job-title-company">{title}</h1>
            <div className="about-star-container">
              <AiFillStar className="star-icon-about" />
              <p className="rating-about">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-footer">
          <div className="location-and-employment-type-about">
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
      <hr className="separator-job-about" />
      <div className="description-header">
        <div>
          <h1>Description</h1>
          <a
            href={companyWebsiteUrl}
            className="anchor-link"
            target={companyWebsiteUrl}
          >
            Visit <BiLinkExternal />
          </a>
        </div>
        <p className="about-job-description">{jobDescription}</p>
      </div>
      <div>
        <h1 className="about-skill-head">Skills</h1>
        <ul className="list-skills-about">
          {skills.map(eachSkill => (
            <li key={eachSkill.name}>
              <img src={eachSkill.imageUrl} alt="" />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="life-company-about">
        <h1>Life at Company</h1>
        <div>
          <p>{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="lift-at-image"
          />
        </div>
      </div>
    </div>
  )
}

export default AboutJob
