import { Theme } from "@mui/material/styles";
import { makeStyles } from "./makeStyles";

const drawerWidth = 240;
// COMPLETE: CSS Priority
// Use tss-react to get the correct CSS priority.
// @ts-ignore I don't know how to fix this, but it works
export const useStyles = makeStyles()((theme: Theme) => ({
  "root": {
    display: "flex"
  },
  "toolbar": {
    paddingRight: 24 // keep right padding when drawer closed
  },
  "toolbarIcon": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  "appBar": {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  "appBarShift": {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "menuButton": {
    marginRight: 36,
    opacity: 1,
    transition: theme.transitions.create(["opacity",], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "menuButtonHidden": {
    // display: "none"
    opacity: 0,
  },
  "title": {
    flexGrow: 1
  },
  "drawerPaper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "drawerPaperClose": {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
      display: "flex",
    }
  },
  "appBarSpacer": theme.mixins.toolbar,
  "content": {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  "container": {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  "paper": {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  "fixedHeight": {
    height: 240
  }
}));