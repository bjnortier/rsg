import React from 'react'
import { round10 } from 'round10'
import styled from 'styled-components'

import { ScalarXYGraph } from '../../src'

// Re-map the data form timestamps to millisecs from start
// Temporal Data is in the form {t: <timestamp>, v: <value>} an in
// reverse chronological order
import temporalData from '../resources/flow.json'
temporalData.reverse()
const start = temporalData[0].t
const xValues = temporalData.map(d => round10((d.t - start) / 100000, 0)).slice(100, 200)
const yValues1 = temporalData.map(d => d.v).slice(100, 200)
const yValues2 = temporalData.map(d => d.v).slice(200, 300)
const data1 = {
  x: {
    label: 'Iterations',
    values: xValues
  },
  y: [{
    label: 'foo',
    values: yValues1
  }, {
    label: 'bar',
    values: yValues2
  }]
}

// The dimensions of the actual data, excluding titles, axes etc.
// const contentsWidths = [800, 640, 480, 320, 240]
const contentsWidths = [640, 320]
const contentsHeights = [320, 160]
const padding = 80

const GraphContainer = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height};
  background-color: #fff;
  margin: 20px;
`

export default (props) => <div>
  {contentsWidths.map(contentsWidth => {
    return contentsHeights.map(contentsHeight => {
      const svgWidth = contentsWidth + 2 * padding
      const svgHeight = contentsHeight + 2 * padding
      const key = `${contentsWidth}:${contentsHeight}`
      return <GraphContainer key={key} width={svgWidth} height={svgHeight} >
        <ScalarXYGraph
          data={data1}
          width={svgWidth}
          height={svgHeight}
          padding={padding}
          title={`RSG Scalar XY Graph ${key}`}
        />
      </GraphContainer>
    })
  })}
</div>