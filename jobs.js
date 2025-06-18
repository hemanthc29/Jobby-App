import {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileSection from '../ProfileSection'
import JobsList from '../JobsList'
import FilterGroups from '../FilterGroups'
import './index.css'

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

const Jobs = () => {
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const onEmploymentTypeChange = employmentTypeId => {
    setSelectedEmploymentTypes(prevState =>
      prevState.includes(employmentTypeId)
        ? prevState.filter(id => id !== employmentTypeId)
        : [...prevState, employmentTypeId],
    )
  }

  const onSalaryRangeChange = salaryRangeId => {
    setSelectedSalaryRange(salaryRangeId)
  }

  const handleSearch = () => {
    setSearch(searchInput)
  }

  const clearFilters = () => {
    setSelectedEmploymentTypes([])
    setSelectedSalaryRange('')
    setSearch('')
  }
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <Header />
      <div className="MainProductsContainer">
        <div className="FiltersProfileContainer">
          <ProfileSection />
          <FilterGroups
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onEmploymentTypeChange={onEmploymentTypeChange}
            onSalaryRangeChange={onSalaryRangeChange}
            selectedEmploymentTypes={selectedEmploymentTypes}
            selectedSalaryRange={selectedSalaryRange}
            clearFilters={clearFilters}
          />
        </div>
        <div className="ProductsContainer">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search jobs"
              className="Searchelement"
            />

            <div>
              <button
                type="button"
                data-testid="searchButton"
                onClick={handleSearch}
                className="searchbtn"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          <JobsList
            employmentTypes={selectedEmploymentTypes}
            salaryRange={selectedSalaryRange}
            searchQuery={search}
          />
        </div>
      </div>
    </div>
  )
}

export default Jobs