import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import AboutJob from '../AboutJob'
import './index.css'

const apiStatusViewJob = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusViewJob.initial,
    similarJobsData: [],
    jobDataDetails: [],
  }

  componentDidMount() {
    this.getJobDetailsUsingId()
  }

  // API Call For Job Details Data
  getJobDetailsUsingId = async () => {
    this.setState({apiStatus: apiStatusViewJob.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = 'https://apis.ccbp.in/jobs/'
    const response = await fetch(`${apiUrl}${id}`, options)
    if (response.ok) {
      const fetchedJobData = await response.json()
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )

      const updatedSimilarJobDetails = fetchedJobData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
          employmentType: eachItem.employment_type,
        }),
      )
      this.setState({
        jobDataDetails: updatedJobDetailsData,
        similarJobsData: updatedSimilarJobDetails,
        apiStatus: apiStatusViewJob.success,
      })
    } else {
      this.setState({apiStatus: apiStatusViewJob.failure})
    }
  }

  // Job Data Success View
  renderJobDataSuccessView = () => {
    const {jobDataDetails, similarJobsData} = this.state
    return (
      <div className="job-details-page-home">
        <div className="details-card-job">
          <AboutJob jobDetails={jobDataDetails} />
          <SimilarJobs similarItem={similarJobsData} />
        </div>
      </div>
    )
  }

  // Loader
  renderJobDetailsLoader = () => (
    <div className="loader-container-job" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // Job Data Failure View
  retryJobData = () => {
    this.getJobDetailsUsingId()
  }

  renderJobDetailsFailureView = () => (
    <div className="job-failure-using-id">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img-view"
      />
      <h1>Opps! Something Went Wrong</h1>
      <p>Wee cannot seem to find the page your looking for.</p>
      <button type="button" className="re-btn" onClick={this.retryJobData}>
        Retry
      </button>
    </div>
  )

  // API Status of job details
  renderJobDetailsUsingApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderJobDataSuccessView()
      case 'IN_PROGRESS':
        return this.renderJobDetailsLoader()
      case 'FAILURE':
        return this.renderJobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-page">
          {this.renderJobDetailsUsingApiStatus()}
        </div>
      </>
    )
  }
}
export default JobDetails
