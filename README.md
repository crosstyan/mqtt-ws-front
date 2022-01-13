# HQUCC

See also [crosstyan/mqtt-to-ws](https://github.com/crosstyan/mqtt-to-ws)

Migrate to vite from `create-react-app` for better performance. See also:

- [Migrating a Create React App (CRA) application to Vite - Darragh ORiordan](https://www.darraghoriordan.com/2021/05/16/migrating-from-create-react-app-to-vite/)
- [Migrating a Create React App project to Vite](https://darekkay.com/blog/create-react-app-to-vite/)
- [alloc/vite-react-jsx: React 17's automatic JSX runtime for your entire bundle](https://github.com/alloc/vite-react-jsx)
- [javascript - ReferenceError: React is not defined - Migrating from CRA to Vite and NX - Stack Overflow](https://stackoverflow.com/questions/70519656/referenceerror-react-is-not-defined-migrating-from-cra-to-vite-and-nx)

## MUI and Material-UI

`@material-ui/core` is the version 4 of [Material-UI](https://v4.mui.com/), which is still used in many code.

But if you want to the latest version of [MUI](https://mui.com/zh/) (`@mui/material`), you should upgrade it. Confusingly, They used different package name.

Weirdly, [`useStyles`](https://mui.com/styles/basics/) can't be migrated to `@mui` correctly. Although the [Migration from v4 to v5](https://mui.com/guides/migration-v4/#main-content) guide is very good, but it's still not working.

I choose to use [garronej/tss-react](https://github.com/garronej/tss-react) to solve this problem, which seems to be a `useStyles` implementation by [Emotion](https://emotion.sh/docs/introduction)

## Config

You have to add `--openssl-legacy-provider` to `NODE_OPTIONS` environment variable if you're running Node.js 17 or higher. Here is how to do it in PowerShell.

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

Modify [`src/config.ts`](src/config.ts) to configure API address and other stuff.

## Available Scripts

See also [Getting Started | Vite](https://vitejs.dev/guide/)

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode. use `--port` to specify the port.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Example

### CodeSandbox

- [Learn React & Material UI - CodeSandbox](https://codesandbox.io/s/m76rzooo3p)
- [react-material-ui-pomodoro-tomatoe-timer - CodeSandbox](https://codesandbox.io/s/github/Caruso33/pomodoR/tree/master/)
- [Navigation Rail Demo - CodeSandbox](https://codesandbox.io/s/navigation-rail-demo-ub1s9?file=/index.tsx)
- [Bulk actions with modes - CodeSandbox](https://codesandbox.io/s/wz727jn5w5)
- [react-material-dashboard - CodeSandbox](https://codesandbox.io/s/github/ordazgustavo/react-material-dashboard/tree/master/)
- [Basic React with Material UI. Theme with colour palette, typography, component props and restyling - CodeSandbox](https://codesandbox.io/s/basic-react-with-material-ui-theme-with-colour-palette-typography-component-props-and-restyling-q742p)
- [MaterialUI Responsive AppBar - CodeSandbox](https://codesandbox.io/s/64kr4k1lww)
- [dark-theme-switch - CodeSandbox](https://codesandbox.io/s/dark-theme-switch-tp37c)
- [Material demo - CodeSandbox](https://codesandbox.io/s/material-demo-929km?file=/index.tsx)
- [D3 Real-time Time Series Chart](https://codepen.io/browles/pen/mPMBjw)

#### Router

- [react-router(MUI-Drawer) - CodeSandbox](https://codesandbox.io/s/react-router-mui-drawer-py2h1)
- [Tabs Material demo 1 - CodeSandbox](https://codesandbox.io/s/romantic-sound-3rn1ym547q?file=/demo.js)
- [ReactQuestions - CodeSandbox](https://codesandbox.io/s/reactquestions-7q3bo)

### GitHub

- [uds5501/dashboard-switch-themes: Created with CodeSandbox](https://github.com/uds5501/dashboard-switch-themes)
