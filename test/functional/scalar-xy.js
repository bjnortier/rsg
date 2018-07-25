import React from 'react'
import { render } from 'react-dom'
import { round10 } from 'round10'

import { ScalarXYGraph } from '../..'

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

const data = {
  x: {
    label: 'X',
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  y: [
    {
      label: 'A',
      values: [ 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
    },
    {
      label: 'B',
      values: [ 10, 11, 12, 14, 16, 18, 21, 24, 28, 32, 37 ]
    }
  ]
}

render(
  <div>
    <div style={{backgroundColor: '#fff'}}>
      <ScalarXYGraph
        data={data}
        width={600}
        height={400}
        padding={50}
        title={`Example Graph`}
      />
    </div>
    {contentsWidths.map(contentsWidth => {
      return contentsHeights.map(contentsHeight => {
        const svgWidth = contentsWidth + 2 * padding
        const svgHeight = contentsHeight + 2 * padding
        const key = `${contentsWidth}:${contentsHeight}`
        return <div key={key} style={{margin: 20}}>
          <div style={{width: svgWidth, height: svgHeight, backgroundColor: '#fff'}}>
            <ScalarXYGraph
              data={data1}
              width={svgWidth}
              height={svgHeight}
              padding={padding}
              title={`RSG Scalar XY Graph ${key}`}
            />
          </div>
        </div>
      })
    })}
  </div>,
  document.getElementById('contents')
)