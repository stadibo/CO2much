import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import useResizeAware from 'react-resize-aware'
import { getCountryData, getKeys } from './services/emissionsService'
import { createBaseEmissionsSeries } from './utils/timeseries'
import EmissionsChart from './components/EmmissionsChart'
import Header from './components/Header'
import Nav from './components/Nav'
import Search from './components/Search'
import Grid from '@material-ui/core/Grid'

const App = () => {
  const [ResizeListener, sizes] = useResizeAware()

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
    value: "/search"
  })

  // const [windowState, setWindowState] = useState({
  //   widht: 0
  // })

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
      <ResizeListener />
      <Router>
        <Grid container spacing={24}>
          <Route exact path="/" render={() => <Redirect to="/search" />} />

          <Route path="/" render={() => (
            <Grid item xs={12}>
              <Nav state={navState} setState={setNavState} />
            </Grid>
          )} />

          <Route path="/" render={() => (
            <Grid item xs={12}>
              <Header />
            </Grid>
          )} />

          <Route path="/search" render={() => (
            <Grid item xs={12}>
              <SearchAndGraph
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                sendRequest={fetchCountryData}
                chartState={chartState}
                setChartState={setChartState}
                sizes={sizes}
              />
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
    setChartState,
    sizes
  } = props

  return (
    <Grid container>
      <Grid item xs={12}>
        <Search state={searchBoxState} setState={setSearchBoxState} sendRequest={sendRequest} />
      </Grid>
      <Grid item xs={12}>
        <EmissionsChart state={chartState} setState={setChartState} sizes={sizes} />
      </Grid>
    </Grid >
  )
}

export default App;