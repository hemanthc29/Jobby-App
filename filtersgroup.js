import './index.css'

const FilterGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onEmploymentTypeChange,
    onSalaryRangeChange,
    selectedEmploymentTypes,
    selectedSalaryRange,
    clearFilters,
  } = props

  const onChangeEmployment = event => {
    onEmploymentTypeChange(event.target.value)
  }

  const onChangeSalary = event => {
    onSalaryRangeChange(event.target.value)
  }

  return (
    <div className="filters-container">
      <hr className="divider" />
      <h2>Type of Employment</h2>
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              id={each.employmentTypeId}
              value={each.employmentTypeId}
              onChange={onChangeEmployment}
              checked={selectedEmploymentTypes.includes(each.employmentTypeId)}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="divider" />
      <h2>Salary Range</h2>
      <ul>
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              type="radio"
              id={each.salaryRangeId}
              name="salary"
              value={each.salaryRangeId}
              onChange={onChangeSalary}
              checked={selectedSalaryRange === each.salaryRangeId}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <div className="btnfilter">
        <button type="button" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    </div>
  )
}

export default FilterGroups