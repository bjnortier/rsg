import React from 'react'
import styled from 'styled-components'
import jstz from 'jstz'

import computeTimeLayout from '../../src/computeTimeLayout'
import { TimeXAxis } from '../../src'

const timeBounds = [
  [new Date('2002-01-01T00:00:00Z').getTime(), '7y', 'utc'],
  [new Date('2002-01-01T00:00:00Z').getTime(), '6y', 'utc'],
  [new Date('2018-06-22T00:00:00Z').getTime(), '6y', 'utc'],
  [new Date('2018-06-22T00:00:00Z').getTime(), '1mo', 'utc'],
  [new Date('2018-06-01T00:00:00Z').getTime(), '1mo', 'utc'],
  [new Date('2018-01-03T00:00:00Z').getTime(), '1w', 'utc'],
  [new Date('2018-06-19T00:00:00Z').getTime(), '1w', 'utc'],
  [new Date('2018-06-19T12:00:00Z').getTime(), '2d', 'utc'],
  [new Date('2018-06-19T00:00:00Z').getTime(), '2d', 'utc'],
  [new Date('2018-06-19T03:00:00Z').getTime(), '1d', 'utc'],
  [new Date('2018-06-19T00:00:00Z').getTime(), '1d', 'utc'],
  [new Date('2018-06-19T08:00:00Z').getTime(), '12h', 'utc'],
  [new Date('2018-06-19T00:00:00Z').getTime(), '12h', 'utc'],
  [new Date('2018-06-19T02:00:00Z').getTime(), '6h', 'utc'],
  [new Date('2018-06-19T00:00:00Z').getTime(), '6h', 'utc'],
  [new Date('2018-06-19T00:30:00Z').getTime(), '3h', 'utc'],
  [new Date('2018-06-19T00:00:00Z').getTime(), '3h', 'utc'],
  [new Date('2018-06-19T00:15:00Z').getTime(), '1h', 'utc'],
  [new Date('2018-06-19T00:15:00Z').getTime(), '1h', 'local'],
  [new Date('2018-06-19T12:00:00Z').getTime(), '1h', 'utc'],
  [new Date('2018-06-19T10:00:00Z').getTime(), '1h', 'local']
]
const widths = [800, 640, 480, 320, 240]

const Limits = styled.div`
  margin: 20px;
`

const Width = styled.div`
  display: inline-block;
  margin: 10px;
`

const SVGContainer = styled.div`
  width: ${({ width }) => width}px;
  margin: 20px;
  background-color: #fff;
`

export default (props) => <div>
  {timeBounds.map(([maxTimestamp, periodLabel, localOrUTC], i) => {
    const timezone = localOrUTC === 'local' ? jstz.determine().name() : 'UTC'
    return <div key={i}>
      <Limits>{new Date(maxTimestamp).toGMTString()} - {periodLabel} [{localOrUTC}]</Limits>
      {widths.map(width => {
        const layout = computeTimeLayout(maxTimestamp, periodLabel, localOrUTC)
        return <SVGContainer
          key={width}
          width={width + 48}
        >
          <Width>{width}px</Width>
          <svg width={width + 48} height={48}>
            <g transform={`translate(24, 0)`}>
              <line stroke='#ddd' x1={0} y1={0} x2={width} y2={0} />
              <TimeXAxis
                width={width}
                layout={layout}
                timezone={timezone}
              />
            </g>
          </svg>
        </SVGContainer>
      })}
    </div>
  })}
</div>
