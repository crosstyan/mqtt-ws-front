import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Plot, Point } from "./components/Plot/Plot";
import { useStyles } from "./style";

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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
  ChevronLeft as ChevronLeftIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Star
} from "@material-ui/icons";

const url = 'ws://127.0.0.1:8080/ws'
const ws = new WebSocket(url);

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [darkState, setDarkState] = useState(false);
  const [data, setData] = useState<Point[]>([]);

  useEffect(() => {
    ws.onmessage = (event) => {
      console.log(event.data);
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
  const classes = useStyles();
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
          >
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
          <Switch checked={darkState} onChange={handleThemeChange} />
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
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        }</List>
        <Divider />
        <List>{
          <ListItem button>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Star" />
          </ListItem>
        }</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={paperClass}>
                <Plot data={data} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={paperClass}>
                <h1>No</h1>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h1>Idea</h1>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}