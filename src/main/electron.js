const path = require("path");
const { app } = require("electron");
const isDev = require("electron-is-dev");
const { menubar } = require("menubar");
let installExtension, REACT_DEVELOPER_TOOLS;

let mb = createMenubar();

mb.on("after-create-window", openDevToolsForReact);

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

mb.on("ready", () => {
  console.log("app is ready");
});

function openDevToolsForReact() {
  if (isDev) {
    mb.window.openDevTools({ mode: "detach" });
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
}

function createMenubar() {
  
  if (isDev) {
    const devTools = require("electron-devtools-installer");
    installExtension = devTools.default;
    REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
  }

  const appIndex = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  const icon = path.join(__dirname, "../../src/images/mac/icon@2x.png");

  const mb = menubar({
    index: appIndex,
    icon: icon,
    tooltip: "Airly widget",
    browserWindow: {
      webPreferences: {
        nodeIntegration: true,
      },
    },
  });

  mb.app.commandLine.appendSwitch(
    "disable-backgrounding-occluded-windows",
    "true"
  );

  return mb;
}
