import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarItem} = props
  const renderListOfSimilarJob = () => (
    <>
      <h1 className="similar-jobs-heading">Similar Jobs</h1>
      <ul className="similar-jobs-list">
        {similarItem.map(eachSimilarItem => (
          <li key={eachSimilarItem.id} className="similar-card">
            <div className="similar-job-view">
              <img
                src={eachSimilarItem.companyLogoUrl}
                alt="similar job company logo"
                className="similar-image-view"
              />
              <div className="similar-job-title">
                <h1 className="similar-job-head">{eachSimilarItem.title}</h1>
                <div className="rating-view-similar">
                  <AiFillStar color=" #fbbf24" />
                  <p>{eachSimilarItem.rating}</p>
                </div>
              </div>
            </div>
            <div className="similar-job-description">
              <p>{eachSimilarItem.jobDescription}</p>
            </div>
            <div className="about-similar-job">
              <div className="viewer">
                <MdLocationOn size="25px" />
                <p>{eachSimilarItem.location}</p>
              </div>
              <div className="viewer">
                <BsBriefcaseFill size="25px" />
                <p>{eachSimilarItem.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
  return <div className="similar-jabs-view">{renderListOfSimilarJob()}</div>
}
export default SimilarJobs
