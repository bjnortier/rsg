import React from 'react'
import PropTypes from 'prop-types'

const HoverPath = ({ width, height, xValue, yValue, xValueFormatter, layout, color, hoverSelectStyle }) => {
  const xMin = layout.x.min
  const xMax = layout.x.max
  const yMin = layout.y.min
  const yMax = layout.y.max

  const xValueString = xValueFormatter(xValue)
  const yValueString = String(yValue)
  const infoWidth = Math.round((xValueString.length + yValueString.length) * 7.3 + 16)
  const xPos = ((xValue - xMin) / (xMax - xMin)) * width
  const yPos = height - ((yValue - yMin) / (yMax - yMin)) * height
  const radius = hoverSelectStyle === 'circle' ? 5 : 2
  const fill = hoverSelectStyle === 'circle' ? 'none' : color
  const strokeDasharray = hoverSelectStyle === 'circle' ? '2,2' : null
  return (
    <g pointerEvents='none'>
      <line
        stroke={color}
        strokeDasharray='2,2'
        x1={xPos}
        y1={yPos + radius + 3}
        x2={xPos}
        y2={height}
      />
      <line
        stroke={color}
        strokeDasharray='2,2'
        x1={xPos - radius - 3}
        y1={yPos}
        x2={0}
        y2={yPos}
      />
      <g transform={`translate(${xPos},${yPos})`}>
        <circle stroke={color} strokeDasharray={strokeDasharray} fill={fill} r={radius} />
      </g>
      <g
        transform={`translate(${xPos +
          (xPos > width / 2
            ? -infoWidth - 8
            : 8)},${yPos +
          (yPos > height / 2 ? -33 - 8 : 8)})`}
      >
        <rect
          x={0}
          y={0}
          width={infoWidth}
          height={20}
          stroke='#ddd'
          strokeDasharray='2,2'
          fill='white'
          fillOpacity={0.8}
        />
        <text textAnchor='start' x={4} y={14} fill='#000'>
          {`${xValueString}:`}
        </text>
        <text
          textAnchor='end'
          x={infoWidth - 4}
          y={14}
          fill={color}
        >
          {yValueString}
        </text>
      </g>
    </g>
  )
}

HoverPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xValue: PropTypes.number.isRequired,
  yValue: PropTypes.number.isRequired,
  xValueFormatter: PropTypes.func.isRequired,
  layout: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  hoverSelectStyle: PropTypes.oneOf(['circle', 'fine']).isRequired
}

export default HoverPath
