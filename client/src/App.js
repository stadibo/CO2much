import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { getCountryData, getKeys } from './services/emissionsService'
import { createBaseEmissionsSeries } from './utils/timeseries'
import EmissionsChart from './components/EmmissionsChart'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'
import Grid from '@material-ui/core/Grid'

const App = () => {
  const [searchBoxState, setSearchBoxState] = useState({
    input: '',
    keys: [],
    suggestions: [],
    suggestionString: ""
  })

  const [chartState, setChartState] = useState({
    series: null,
    timerange: null,
    selection: null,
    highlight: null
  })

  const [navState, setNavState] = useState({
    value: 0
  })

  const fetchCountryData = (key) => {
    getCountryData(key).then(data => {
      return createBaseEmissionsSeries(data)
    }).then(series => {
      setChartState({ ...chartState, series: series, timerange: series.range() })
    })
  }

  useEffect(() => {
    getKeys().then(data => {
      setSearchBoxState({ ...searchBoxState, keys: data })
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Grid container>
          <Route exact path="/" render={() => <Redirect to="/search" />} />

          <Route path="/" render={() => (
            <Grid item md={12}>
              <Header />
            </Grid>
          )} />

          <Route path="/" render={() => (
            <Grid item md={12}>
              <SearchAndGraph
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                sendRequest={fetchCountryData}
                chartState={chartState}
                setChartState={setChartState}
              />
            </Grid>
          )} />

          <Route path="/" render={({ history }) => (
            <Grid item xs={12}>
              <Footer state={navState} setState={setNavState} />
            </Grid>
          )} />
        </Grid >
      </Router>
    </div >
  )
}



const SearchAndGraph = (props) => {
  const {
    searchBoxState,
    setSearchBoxState,
    sendRequest,
    chartState,
    setChartState
  } = props

  return (
    <Grid container>
      <Grid item xs={12}>
        <Search state={searchBoxState} setState={setSearchBoxState} sendRequest={sendRequest} />
      </Grid>
      <Grid item xs={12}>
        <EmissionsChart state={chartState} setState={setChartState} />
      </Grid>
    </Grid >
  )
}

export default App;
