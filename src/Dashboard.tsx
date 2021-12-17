import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Point } from "./components/plot";
import { Realtime as RealtimeChart } from "./page/realtime";
import { HistoryChart } from "./page/history";
import { useStyles } from "./styles"
import { config } from "./config";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import {
  CssBaseline,
  Switch,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Avatar,
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
import MenuIcon from "@mui/icons-material/Menu";
import {
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Star,
  Timeline,
  History
} from "@mui/icons-material";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
} from 'react-router-dom';

const url = `ws://${config.addr}${config.wsPath}`;
const ws = new WebSocket(url);

// The point of x should be the time
// Generated by Date.now()
export type MQTTTopic = "temperature" | "humidity"
interface MQTTMsg {
  topic: MQTTTopic;
  payload: string;
}



export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [darkState, setDarkState] = useState(false);
  const [tmpData, setTmpData] = useState<Point[]>([{ x: Date.now(), y: 0 }]);
  const [hmdData, setHmdData] = useState<Point[]>([{ x: Date.now(), y: 0 }]);
  const { classes, cx } = useStyles();
  // value for tabs
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // value for selectedIndex of list
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  let tmpTemp: Point[] = [];
  let hmdTemp: Point[] = [];
  const PLOT_LENGTH = 10;

  useEffect(() => {
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
              return [...hmdTemp]
            }
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
    return () => {
      ws.onmessage = null
    }
  }, []);


  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const paperClass = clsx(classes.paper);
  return (
    <div id="Dashboard" className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            IOT Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose} size="large">
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={RouterLink}
            selected={selectedIndex === 0}
            to="/"
            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>)=> {
              handleDrawerClose()
              handleListItemClick(event, 0)
            }}>
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary="Realtime" />
          </ListItem>
          <ListItem button
            component={RouterLink}
            to="/history"
            selected={selectedIndex === 1}
            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>)=> {
              handleDrawerClose()
              handleListItemClick(event, 1)
            }}>
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Routes>
            <Route path="/" element={<RealtimeChart tmpData={tmpData} hmdData={hmdData} />} />
            <Route path="/history" element={
              <div id="history">
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Temperature" value="1" />
                      <Tab label="Humidity" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{padding:'0px', paddingTop:'12px'}} value="1">
                    <HistoryChart topic="temperature"/>
                  </TabPanel>
                  <TabPanel sx={{padding:'0px', paddingTop:'12px'}} value="2">
                    <HistoryChart topic="humidity"/>
                  </TabPanel>
                </TabContext>
              </div>
            } />
          </Routes>
        </Container>
      </main>
    </div>
  );
}