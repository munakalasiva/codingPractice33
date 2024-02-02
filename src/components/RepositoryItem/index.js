import './index.css'

const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {name, issuesCount, forksCount, starsCount, imageUrl} = eachRepoDetails

  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} className="img" />
      <h1 className="head">{name}</h1>

      <div className="style">
        <img
          className="imgs"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>

      <div className="style">
        <img
          className="imgs"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>

      <div className="style">
        <img
          className="imgs"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
