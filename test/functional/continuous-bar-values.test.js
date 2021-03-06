import React, { Component } from 'react'
import styled from 'styled-components'
import { Box2 } from 'vecks'

import ContinuousBarValues from '../../src/ContinuousBarValues'

const values1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
  x,
  y: Math.exp(x / 10) - 0.8
}))
const values2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => ({
  x,
  y: Math.exp(x / 20) - 0.9
}))

const GraphContainer = styled.svg`
  display: inline-block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  margin: 20px;
`

class GraphWithValue extends Component {
  render () {
    const width = 300
    const height = 300
    const bounds = new Box2()
      .expandByPoint({ x: -0.5, y: 0 })
      .expandByPoint({ x: 10.5, y: 2 })
    const layout = {
      x: { min: bounds.min.x, max: bounds.max.x },
      y: { min: bounds.min.y, max: bounds.max.y }
    }

    const xInfoFormatter = timestamp => timestamp

    return (
      <div>
        <GraphContainer width={width} height={height}>
          <ContinuousBarValues
            values={values1}
            width={width}
            height={height}
            color='#2ca02c'
            dx={1}
            layout={layout}
            xInfoFormatter={xInfoFormatter}
          />
          <ContinuousBarValues
            values={values2}
            width={width}
            height={height}
            color='#1f77b4'
            dx={1}
            layout={layout}
            xInfoFormatter={xInfoFormatter}
          />
        </GraphContainer>
      </div>
    )
  }
}

const ContinuousBarValuesTest = props => (
  <div>
    <GraphWithValue />
  </div>
)

export default ContinuousBarValuesTest
