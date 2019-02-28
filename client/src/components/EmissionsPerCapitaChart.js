import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

// Charts library
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  BarChart,
  Resizable,
  styler
} from 'react-timeseries-charts'

const EmissionsPerCapitaChart = ({ state, setState, sizes }) => {

  const style = styler([
    { key: "CO2_perCapita", color: "#333", selected: "#2CB1CF" }
  ])

  const handleTimeRangeChange = timerange => {
    setState({ ...state, timerange: timerange });
  }

  let infoValues = []
  if (state.highlight) {
    const emissionsText = `${parseFloat(state.highlight.event.value(state.highlight.column)).toFixed(3)}`
    infoValues = [{ label: "co2/capita", value: emissionsText }]
  }

  let selectedValue = null
  let selectedYear = null
  if (state.selection) {
    selectedValue = `${parseFloat(state.selection.event.value(state.selection.column)).toFixed(3)} metric tonnes (co2/capita)`
    selectedYear = state.selection.event.index().toNiceString()
  }

  let name = null
  if (state.series) {
    name = state.series.name()
  }

  let height = ""
  if (sizes) {
    height = sizes.width >= 480 ? 400 : 225
  }

  return (
    <React.Fragment>
      {state.series ?
        <div className="root">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper style={{ padding: "5px" }}>
                <div>
                  <Typography variant="h6" gutterBottom>CO2 emissions per capita {name}</Typography>
                  <Typography variant="subtitle1" style={{ paddingBottom: "10px" }}>
                    Selected: {selectedYear} -- {selectedValue}
                  </Typography>
                </div>
                <Resizable>
                  <ChartContainer
                    timeRange={state.timerange}
                    enablePanZoom={true}
                    onTimeRangeChanged={handleTimeRangeChange}
                    onBackgroundClick={() => setState({ ...state, selection: null })}
                  >
                    <ChartRow height={height}>
                      <YAxis
                        id="CO2"
                        label="CO2/capita (t)"
                        min={0}
                        max={state.series.max("CO2_perCapita")}
                        width="55"
                      />
                      <Charts>
                        <BarChart
                          axis="CO2"
                          style={style}
                          columns={["CO2_perCapita"]}
                          series={state.series}
                          highlighted={state.highlight}
                          onHighlightChange={highlight =>
                            setState({ ...state, highlight: highlight })
                          }
                          info={infoValues}
                          infoWidth={120}
                          selected={state.selection}
                          onSelectionChange={selection =>
                            setState({ ...state, selection: selection })
                          }
                        />
                      </Charts>
                    </ChartRow>
                  </ChartContainer>
                </Resizable>
              </Paper>
            </Grid>
          </Grid>
        </div>
        : <p>Search for country to show data</p>
      }
    </React.Fragment>
  )
}

export default EmissionsPerCapitaChart