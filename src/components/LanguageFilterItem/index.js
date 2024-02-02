import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageDetails, isActive, setActiveLanguageId} = props
  const {id, language} = eachLanguageDetails

  const onClickButton = () => {
    setActiveLanguageId(id)
  }

  const btnClassName = isActive ? 'language-btn active' : 'language-btn'

  return (
    <li className="list-item">
      <button type="button" onClick={onClickButton} className={btnClassName}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
