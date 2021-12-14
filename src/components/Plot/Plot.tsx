import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";
import 'react-vis/dist/style.css';

export interface Point {
  x: number
  y: number
}

interface PlotProps {
  data: Point[]
}

export const Plot = ({ data }: PlotProps): JSX.Element => {
  // const xDomain = [-1, 3]
  // const yDomain = [-5, 15]
  // const verticalTickValues: number[] = []
  // const horizontalTickValues = [0]
  return (
    // <FlexibleXYPlot {...{ xDomain, yDomain }}>
    // I'm not sure why xDomain and yDomain are necessary. 
    <FlexibleWidthXYPlot height={300} yPadding={5}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis
        attr="x"
        attrAxis="y"
        orientation="bottom"
        tickFormat={function tickFormat(d) { return new Date(d).toLocaleDateString() }} />
      <YAxis
        attr="y"
        attrAxis="x"
        orientation="left" />
      <LineSeries
        data={data}
        opacity={1}
        strokeStyle="solid"
      />
    </FlexibleWidthXYPlot>
  )
}