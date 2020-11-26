const path = require("path");
const { app } = require("electron");
const isDev = require("electron-is-dev");
const { menubar } = require("menubar");
const settings = require("electron-settings");
const { ipcMain } = require("electron");

let installExtension, REACT_DEVELOPER_TOOLS;

let mb = createMenubar();

settings.unsetSync("nearestMeasurements");
settings.unsetSync("nearestInstallation");

mb.on("after-create-window", openDevToolsForReact);

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function openDevToolsForReact() {
  if (isDev) {
    mb.window.openDevTools({ mode: "detach" });
    installExtension(REACT_DEVELOPER_TOOLS);
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
      resizable: false,
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

ipcMain.on("checkForCachedData", (event, type) => {
  settings.get(type).then((value) => {
    if (!value || value === "") {
      event.returnValue = "noData";
    } else {
      let isDataObsolete = Date.now() - value.timestamp > 1800000;
      if (!isDataObsolete) {
        event.returnValue = value;
      } else {
        event.returnValue = "noData";
      }
    }
  });
});

ipcMain.on("cacheData", (event, data) => {
  settings.set(data.dataType, data);
  event.returnValue = "savedCache";
});

ipcMain.on("clearCache", (event, data) => {
  settings.unsetSync("nearestMeasurements");
  settings.unsetSync("nearestInstallation");
  event.returnValue = "clearedCache";
});

