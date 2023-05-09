import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const apiStatusViewProfile = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const apiStatusViewJobs = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    responseSuccess: false,
    profileData: [],
    checkboxInputs: [],
    jobsData: [],
    radioInput: '',
    apiJobs: apiStatusViewJobs.initial,
    apiProfile: apiStatusViewProfile.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  // Get Jobs Data Using API Call
  getJobsDetails = async () => {
    this.setState({apiJobs: apiStatusViewJobs.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobsApiUrl, optionsJobs)

    if (responseJobs.ok === true) {
      const fetchedDataJobs = await responseJobs.json()
      const updatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedDataJobs,
        apiJobs: apiStatusViewJobs.success,
      })
    } else {
      this.setState({apiJobs: apiStatusViewJobs.failure})
    }
  }

  // Get Profile Details
  getProfileDetails = async () => {
    this.setState({apiProfile: apiStatusViewProfile.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok) {
      const proData = [await response.json()]
      const updatedData = proData.map(eachData => ({
        name: eachData.profile_details.name,
        profileImageUrl: eachData.profile_details.profile_image_url,
        shortBio: eachData.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedData,
        responseSuccess: true,
        apiProfile: apiStatusViewProfile.success,
      })
    } else {
      this.setState({apiProfile: apiStatusViewProfile.failure})
    }
  }

  retryProfilePage = () => {
    this.getProfileDetails()
  }

  // Profile Success View
  renderProfileSuccessView = () => {
    const {profileData, responseSuccess} = this.state

    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-view-container">
          <img src={profileImageUrl} alt="profile" className="profile-view" />
          <h1 className="profile-head">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  // Render Failure View Profile
  renderProfileFailureView = () => (
    <div className="profile-failure">
      <button type="button" className="re-btn" onClick={this.retryProfilePage}>
        Retry
      </button>
    </div>
  )

  // Profile Loader View
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // Profile Status
  renderProfileStatus = () => {
    const {apiProfile} = this.state
    switch (apiProfile) {
      case 'SUCCESS':
        return this.renderProfileSuccessView()
      case 'FAILURE':
        return this.renderProfileFailureView()
      case 'IN_PROGRESS':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  // Update CheckInput State
  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobsDetails,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        // eslint-disable-next-line no-unused-vars
        prevState => ({checkboxInputs: filteredData}),
        this.getJobsDetails,
      )
    }
  }

  // Render Employment Page
  renderTypeEmployment = () => (
    <ul className="employment-list">
      {employmentTypesList.map(eachEmployee => (
        <li className="li-container" key={eachEmployee.employmentTypeId}>
          <input
            type="checkbox"
            className="input"
            id={eachEmployee.employmentTypeId}
            onChange={this.onGetInputOption}
          />
          <label htmlFor={eachEmployee.employmentTypeId} className="label-text">
            {eachEmployee.label}
          </label>
        </li>
      ))}
    </ul>
  )

  // Update Radio Input Value In State
  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobsDetails)
  }

  // Render Radio Button Value
  renderRadioInput = () => (
    <ul className="salary-list">
      {salaryRangesList.map(eachSalary => (
        <li className="li-container" key={eachSalary.salaryRangeId}>
          <input
            type="radio"
            className="input"
            id={eachSalary.salaryRangeId}
            onChange={this.onGetRadioOption}
          />
          <label htmlFor={eachSalary.salaryRangeId} className="label-text">
            {eachSalary.label}
          </label>
        </li>
      ))}
    </ul>
  )

  retryJobsPage = () => {
    this.getJobsDetails()
  }

  // OnChange Jobs Data
  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  onSubmitSearchInput = () => {
    this.getJobsDetails()
  }

  // Loader View On Jobs
  jobsLoader = () => (
    <div className="jobs-viewer-loader">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  // Update Jobs View
  onGetJobsView = () => {
    const {jobsData} = this.state
    const noOfJobs = jobsData.length === 0
    return noOfJobs ? (
      <div className="no-jobs-found">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not found any jobs, Try other filters</p>
      </div>
    ) : (
      <ul className="list-job-container">
        {jobsData.map(eachJobData => (
          <JobCard jobItemCard={eachJobData} key={eachJobData.id} />
        ))}
      </ul>
    )
  }

  // Render jobs Failure View
  onGetJobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Opps! Something Went Wrong</h1>
      <p>Wee cannot seem to find the page your looking for.</p>
      <button type="button" className="re-btn" onClick={this.retryJobsPage}>
        Retry
      </button>
    </div>
  )

  // Get Jobs View Status
  onRenderJobsStatus = () => {
    const {apiJobs} = this.state

    switch (apiJobs) {
      case apiStatusViewJobs.success:
        return this.onGetJobsView()
      case apiStatusViewJobs.failure:
        return this.onGetJobsFailureView()
      case apiStatusViewJobs.inProgress:
        return this.jobsLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="search-holder-mobile-view">
            <input
              type="search"
              className="input-search"
              value={searchInput}
              placeholder="Search"
              onChange={this.onGetSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              type="button"
              className="search-btn"
              data-testid="searchButton"
              onClick={this.onSubmitSearchInput}
            >
              <BsSearch height="100%" color="#ffffff" size="20px" />
            </button>
          </div>
          <div className="side-bars">
            {this.renderProfileStatus()}
            <hr className="separator" />
            <h1 className="head-text">Type of Employment</h1>
            {this.renderTypeEmployment()}
            <hr className="separator" />
            {this.renderRadioInput()}
          </div>
          <div className="job-page-container">
            <div className="search-holder">
              <input
                type="search"
                className="input-search"
                value={searchInput}
                placeholder="Search"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
                onClick={this.onSubmitSearchInput}
              >
                <BsSearch height="100%" color="#ffffff" size="20px" />
              </button>
            </div>
            {this.onRenderJobsStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
