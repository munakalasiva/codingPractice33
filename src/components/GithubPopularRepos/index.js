import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const popularRepoStatus = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repoItemsData: [],
    apiStatus: popularRepoStatus.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: popularRepoStatus.loading})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        imageUrl: eachRepo.avatar_url,
      }))

      this.setState({
        repoItemsData: updatedData,
        apiStatus: popularRepoStatus.success,
      })
    } else {
      this.setState({apiStatus: popularRepoStatus.failure})
    }
  }

  renderReposFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoItems = () => {
    const {repoItemsData} = this.state

    return (
      <ul className="repo-items">
        {repoItemsData.map(each => (
          <RepositoryItem key={each.id} eachRepoDetails={each} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case popularRepoStatus.success:
        return this.renderRepoItems()
      case popularRepoStatus.failure:
        return this.renderReposFailureView()
      case popularRepoStatus.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageId = filterId => {
    this.setState({activeLanguageId: filterId}, this.getRepositories)
  }

  renderLanguageHeader = () => {
    const {activeLanguageId} = this.state

    return (
      <ul className="list-items">
        {languageFiltersData.map(eachOne => (
          <LanguageFilterItem
            eachLanguageDetails={eachOne}
            key={eachOne.id}
            isActive={eachOne.id === activeLanguageId}
            setActiveLanguageId={this.setActiveLanguageId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="container">
        <h1>Popular</h1>
        {this.renderLanguageHeader()}
        {this.renderRepositories()}
      </div>
    )
  }
}
export default GithubPopularRepos
