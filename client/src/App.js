import React, { useEffect, useState } from 'react'
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
      <Grid container>
        <Grid item md={12} justify-spacing >
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Search state={searchBoxState} setState={setSearchBoxState} sendRequest={fetchCountryData} />
        </Grid>
        <Grid item xs={12}>
          <EmissionsChart state={chartState} setState={setChartState} />
        </Grid>
        <Grid item xs={12}>
          <Footer state={navState} setState={setNavState} />
        </Grid>
      </Grid >
    </div >
  )
}

export default App;
