import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Plot, Point } from "../components/plot";
import { CustomTable } from "../components/table";
import { CustomAlert } from "../components/alert";
import { useStyles } from "../styles/styles"
import Masonry from '@mui/lab/Masonry';
import { config } from "../config";
import { getUniqueListBy } from "../utils/utils";
import { SxProps } from '@mui/system';
import { Alert, Theme } from '@mui/material';



import {
  Typography,
  Paper,
} from "@mui/material";

interface RealtimeProps {
  tmpData: Point[];
  hmdData: Point[];
}
export type MQTTTopic = "temperature" | "humidity"
const titleStyle = {
  margin: { xs: '8px', md: '12px' },
  color: 'rgba(0,0,0,0.72)',
}
export function Realtime() {
  const { classes, cx } = useStyles();
  const paperClass = clsx(classes.paper);
  const [tmpData, setTmpData] = useState<Point[]>([{ x: Date.now(), y: 0 }]);
  const [hmdData, setHmdData] = useState<Point[]>([{ x: Date.now(), y: 0 }]);
  const [isConErr, setIsConErr] = useState<boolean>(false);
  let tmpTemp: Point[] = [];
  let hmdTemp: Point[] = [];
  const PLOT_LENGTH = 10;

  const url = `ws://${config.addr}${config.wsPath}`;

  // The point of x should be the time
  // Generated by Date.now()
  interface MQTTMsg {
    topic: MQTTTopic;
    payload: string;
  }
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onerror = () => {
      // https://stackoverflow.com/questions/25779831/how-to-catch-websocket-connection-to-ws-xxxnn-failed-connection-closed-be
      setIsConErr(true);
    }
    ws.onmessage = (event) => {
      const msg = event.data
      try {
        const parsed: MQTTMsg = JSON.parse(msg)
        console.log(parsed)
        if (parsed.topic === "temperature") {
          const newPt = { x: Date.now(), y: parseFloat(parsed.payload) }
          // https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks
          // I don't know why but the last data must be used
          setTmpData((d) => {
            if (d.length > PLOT_LENGTH) {
              const temp = d.slice((-PLOT_LENGTH), -1)
              // for some reason slice is not including the last element
              temp.push(d.slice(-1)[0])
              // console.log([...temp, newPt])
              return [...temp, newPt]
            } else {
              tmpTemp.push(newPt)
              tmpTemp = getUniqueListBy(tmpTemp, "x")
              return [...tmpTemp]
            }
          })
          // console.log(tempData)
        } else if (parsed.topic === "humidity") {
          // TODO: refactor this since it's the same as above
          const newPt = { x: Date.now(), y: parseFloat(parsed.payload) }
          setHmdData((d) => {
            if (d.length > PLOT_LENGTH) {
              const temp = d.slice((-PLOT_LENGTH), -1)
              temp.push(d.slice(-1)[0])
              return [...temp, newPt]
            } else {
              hmdTemp.push(newPt)
              hmdTemp = getUniqueListBy(hmdTemp, "x")
              return [...hmdTemp]
            }
          })
        }
      } catch (e) {
        console.error("Parse Error: " + e)
      }
    }
    return () => {
      ws.close()
    }
  }, []);
  return (
    <React.Fragment>
      <CustomAlert isErr={isConErr} sx={{marginBottom:"1rem"}} text="Websocket connection error"/>
      <Masonry columns={{ xs: 1, md: 2 }} spacing={{ xs: 1, md: 2 }}>
        <Paper className={paperClass}>
          <Typography variant="h5" component="div" sx={titleStyle}>Temperature</Typography>
          <Plot data={tmpData} />
        </Paper>
        <Paper className={paperClass}>
          <Typography variant="h5" component="div" sx={titleStyle}>Temperature</Typography>
          <CustomTable rows={tmpData} />
        </Paper>
        <Paper className={paperClass}>
          <Typography variant="h5" component="div" sx={titleStyle}>Humidity</Typography>
          <Plot data={hmdData} />
        </Paper>
        <Paper className={paperClass}>
          <Typography variant="h5" component="div" sx={titleStyle}>Humidity</Typography>
          <CustomTable rows={hmdData} />
        </Paper>
      </Masonry>
    </React.Fragment>
  )
}