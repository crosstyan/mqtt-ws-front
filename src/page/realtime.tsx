import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Plot, Point } from "../components/plot";
import { CustomTable } from "../components/table";
import { useStyles } from "../styles"
import Masonry from '@mui/lab/Masonry';


import {
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Link,
  ListItemIcon,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface RealtimeProps {
  tmpData: Point[];
  hmdData: Point[];
}
export function Realtime({ tmpData, hmdData }: RealtimeProps) {
  const { classes, cx } = useStyles();
  const paperClass = clsx(classes.paper);
  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={{ xs: 1, md: 2 }}>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Temperature</Typography>
        <Plot data={tmpData} />
      </Paper>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Temperature</Typography>
        <CustomTable rows={tmpData} />
      </Paper>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Humidity</Typography>
        <Plot data={hmdData} />
      </Paper>
      <Paper className={paperClass}>
        <Typography variant="h5" component="div">Humidity</Typography>
        <CustomTable rows={hmdData} />
      </Paper>
    </Masonry>
  )
}