import { height } from "@mui/system";
import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  Hint,
  LineSeries,
} from "react-vis";
import 'react-vis/dist/style.css';

export interface Point {
  x: number
  y: number
}

const defaultHeight = 300;

interface PlotProps {
  data: Point[]
  height?: number
  format?: (date:number) => string
}
function tickFormat(date:number):string { return new Date(date).toLocaleTimeString('en-GB') }

export const Plot = ({ data, height, format=tickFormat }: PlotProps): JSX.Element => {
  return (
    // FlexibleXYPlot should be avoided in favor of FlexibleWidthXYPlot
    // <FlexibleXYPlot {...{ xDomain, yDomain }}>
    // I'm not sure why xDomain and yDomain are necessary. 
    <FlexibleWidthXYPlot height={ height ? height : defaultHeight } yPadding={5}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis
        attr="x"
        attrAxis="y"
        orientation="bottom"
        tickLabelAngle={-20}
        // use GB to enable 24h by default
        // https://stackoverflow.com/questions/22347521/change-time-format-to-24-hours-in-javascript
        tickFormat={format} />

      <YAxis
        attr="y"
        attrAxis="x"
        orientation="left" />

      <AreaSeries
        // const MODE = ['noWobble', 'gentle', 'wobbly', 'stiff'];
        animation='noWobble'
        // http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8
        // https://github.com/d3/d3-shape#curves
        curve="curveMonotoneX"
        data={data}
        opacity={0.6}
      />
    </FlexibleWidthXYPlot>
  )
}