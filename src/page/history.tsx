import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Plot, Point } from "../components/plot";
import { CustomTable } from "../components/table";
import { useStyles } from "../styles/styles"
import Masonry from '@mui/lab/Masonry';
import { MQTTTopic } from "./realtime"
import {
  Typography,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { config } from "../config";
import { getUniqueListBy } from "../utils/utils";
import moment from "moment";

interface DataQuery {
  page: number;
  // RFC3399
  start: string;
  // RFC3399
  end?: string;
}
interface ResponseRecord {
  payload: number;
  timestamp: string;
}
interface ResponseMsg {
  records: ResponseRecord[];
}

// datetime-local
function dateTimeLocalToISO(date: string): string {
  const TimeFormat = 'YYYY-MM-DDTHH:mm'
  return moment(date, TimeFormat).toISOString()
}
function dateToDatetimeLocal(date: string | number): string {
  const TimeFormat = 'YYYY-MM-DDTHH:mm'
  return moment(date).format(TimeFormat)
}
function respToPoint(res: ResponseRecord): Point {
  return {
    x: moment(res.timestamp).valueOf(),
    y: res.payload
  }
}

interface HistoryChartProps {
  topic: MQTTTopic;
}

export function HistoryChart({ topic }: HistoryChartProps) {
  const { classes, cx } = useStyles();
  const paperClass = clsx(classes.paper);
  const [data, setData] = useState<Point[]>([{ x: Date.now(), y: 0 }])
  // RFC3399
  const [startDate, setStartDate] = useState<string>(dateToDatetimeLocal(Date.now()))
  const [endDate, setEndDate] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isMore, setIsMore] = useState<boolean>(false)
  // TODO: refactor this function to make it out of this component
  const queryFirstData = (topic: MQTTTopic, startDate: string, endDate: string | null = null) => {
    let queryPath: string
    switch (topic) {
      case 'temperature':
        queryPath = config.tmpPath
        break;
      case 'humidity':
        queryPath = config.hmdPath
        break
      default:
        throw new Error(`Unknown topic: ${topic}`)
    }
    const url = `http://${config.addr}${queryPath}`
    const query: DataQuery = endDate == null ? {
      page: 1,
      start: dateTimeLocalToISO(startDate),
    } : {
      page: 1,
      start: dateTimeLocalToISO(startDate),
      end: dateTimeLocalToISO(endDate),
    }
    console.log(query)
    const rawResponse = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(res => res.json().then(data => {
      console.log(data)
      const ptsData = (data as ResponseMsg).records.map(respToPoint)
      if (ptsData.length > 0) {
        setData(ptsData)
        setIsMore(true)
        // setPage to 2 then
        setPage(page => 2)
      } else {
        setData([{ x: Date.now(), y: 0 }])
        setIsMore(false)
      }
    }))
  }
  // TODO: refactor this function to avoid copy and paste
  const queryMoreData = (topic: MQTTTopic, startDate: string, endDate: string | null = null) => {
    let queryPath: string
    switch (topic) {
      case 'temperature':
        queryPath = config.tmpPath
        break;
      case 'humidity':
        queryPath = config.hmdPath
        break
      default:
        throw new Error(`Unknown topic: ${topic}`)
    }
    const url = `http://${config.addr}${queryPath}`
    const query: DataQuery = endDate == null ? {
      page: page,
      start: dateTimeLocalToISO(startDate),
    } : {
      page: page,
      start: dateTimeLocalToISO(startDate),
      end: dateTimeLocalToISO(endDate),
    }
    console.log(query)
    const rawResponse = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }).then(res => res.json().then(data => {
      console.log(data)
      const ptsData = (data as ResponseMsg).records.map(respToPoint)
      // console.log(ptsData)
      if (ptsData.length > 0) {
        // COMPLETE: Encountered two children with the same key
        // data is always sending so the pagination is not working correctly
        // // Use set can solve such problems, since it make sure every object is unique
        // Set is fucking useless here!
        // https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
        setData(data => {
          const newAry = [...data, ...ptsData]
          const uniqueAry = getUniqueListBy(newAry, 'x')
          // sort descending
          uniqueAry.sort((a, b) => b.x - a.x)
          console.log(uniqueAry)
          return uniqueAry
        })
        setIsMore(true)
        // setPage add 1
        setPage(page => page + 1)
      } else {
        setIsMore(false)
      }
    }))
  }
  const More = ({ topic }: HistoryChartProps) => {
    if (isMore) {
      return (<Button onClick={() => { queryMoreData(topic, startDate, endDate) }}>Get More</Button>)
    } else {
      return (<Button disabled onClick={() => { queryMoreData(topic, startDate, endDate) }}>No More</Button>)
    }
  }

  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={{ xs: 1, md: 2 }}>
      <Paper className={paperClass}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 2 }}
        >
          <TextField
            id="date-start"
            label="Start"
            type="datetime-local"
            defaultValue={startDate}
            sx={{ width: {md:250, xs:"auto"} }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setStartDate(date => e.target.value)
              queryFirstData(topic, e.target.value, endDate)
            }}
          />
          <TextField
            id="date-end"
            label="End"
            type="datetime-local"
            defaultValue={endDate}
            inputProps={{
              min: startDate,
            }}
            sx={{ width: {md:250, xs:"auto"} }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setEndDate(date => e.target.value)
              queryFirstData(topic, startDate, e.target.value)
            }}
          />
        </Stack>
      </Paper>
      <Paper className={paperClass}>
        <Plot data={data} format={(date) => {
          return moment(date).format("HH:mm:ss")
        }} />
      </Paper>
      <Paper className={paperClass}>
        <CustomTable rows={data} />
        <More topic={topic} />
      </Paper>
    </Masonry>
  )
}