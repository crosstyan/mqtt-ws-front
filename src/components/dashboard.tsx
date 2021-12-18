import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Point } from "./plot";
import { Realtime as RealtimeChart } from "../page/realtime";
import { HistoryChart } from "../page/history";
import { useStyles } from "../styles/styles"
import { config } from "../config";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import {
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  ListItemIcon,
  ListItem,
  ListItemText,
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




export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [darkState, setDarkState] = useState(false);
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
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === "/history") {
      setSelectedIndex(1);
    }
  }, [location])

  // FIXME: I don't know why the animation is gone when the component is separated
  // https://stackoverflow.com/questions/58397636/animation-not-triggering-when-using-material-ui

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
            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
            // FIXME: find a better way to do this
            onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
            <Route path="/" element={<RealtimeChart />} />
            <Route path="/history" element={
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Temperature" value="1" />
                    <Tab label="Humidity" value="2" />
                  </TabList>
                </Box>
                <TabPanel sx={{ padding: '0px', paddingTop: '12px' }} value="1">
                  <HistoryChart topic="temperature" />
                </TabPanel>
                <TabPanel sx={{ padding: '0px', paddingTop: '12px' }} value="2">
                  <HistoryChart topic="humidity" />
                </TabPanel>
              </TabContext>
            } />
          </Routes>
        </Container>
      </main>
    </div>
  );
}