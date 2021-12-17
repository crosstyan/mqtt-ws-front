import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Plot, Point } from "../components/plot";
import { CustomTable } from "../components/table";
import { useStyles } from "../styles"
import Masonry from '@mui/lab/Masonry';
import { MQTTTopic } from "../Dashboard"
import {
  Typography,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import {config} from "../config";
import moment from "moment";

interface DataQuery {
  page: number;
  // RFC3399
  start: string;
  // RFC3399
  end?: string;
}
const TimeFormat = 'YYYY-MM-DDTHH:mm'

export function HistoryChart() {
  const { classes, cx } = useStyles();
  const paperClass = clsx(classes.paper);
  const [data, setData] = useState<Point[]>([])
  // RFC3399
  const [startDate, setStartDate] = useState<string>(moment(new Date()).format(TimeFormat))
  const [endDate, setEndDate] = useState<string|null>(null)
  const [page, setPage] = useState<number>(1)
  const handleStartDateChange = ()=>{
    queryData("temperature", page)
  }
  // TODO: refactor this function to make it out of this component
  const queryData = (topic: MQTTTopic, page = 1) => {
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
    const query:DataQuery = endDate == null ? {
        page: page,
        start: moment(startDate, TimeFormat).toISOString(),
    } : {
        page: page,
        start: moment(startDate, TimeFormat).toISOString(),
        end: moment(endDate, TimeFormat).toISOString()
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
    }))
  }
  useEffect(() => {
    console.log('startDate', startDate)
  })
  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={{ xs: 1, md: 2 }}>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Temperature</Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 4 }}
        >
          <TextField
            id="date-start"
            label="Start"
            type="datetime-local"
            defaultValue={startDate}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{
              setStartDate(e.target.value)
              queryData("temperature", page)
            }}
          />
          <TextField
            id="date-end"
            label="End"
            type="datetime-local"
            defaultValue={endDate}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e)=>{
              setStartDate(e.target.value)
              queryData("temperature", page)
            }}
          />
        </Stack>
      </Paper>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Temperature</Typography>
        <Plot data={data} />
      </Paper>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Temperature</Typography>
        <CustomTable rows={data} />
      </Paper>
    </Masonry>
  )
}