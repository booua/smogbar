const path = require("path");
const { app } = require("electron");
const isDev = require("electron-is-dev");
const { menubar } = require("menubar");
const settings = require("electron-settings");
const { ipcMain } = require("electron");

let installExtension, REACT_DEVELOPER_TOOLS;

app.on("ready", () => {
  let mb = createMenubar();

  settings.unsetSync("nearestMeasurements");
  settings.unsetSync("nearestInstallation");

  mb.on("after-create-window", () => {
    if (isDev) {
      mb.window.openDevTools({ mode: "detach" });
      installExtension(REACT_DEVELOPER_TOOLS);
    }
  });

  ipcMain.on("setIcon", (event, data) => {
    setTrayIcon(data);
    event.returnValue = "iconSet";
  });

  function setTrayIcon(caqiValue) {
    if (caqiValue >= 100) {
      mb.tray.setImage(
        path.join(__dirname, "../../src/images/mac/iconv@2x.png")
      );
    } else if (caqiValue >= 75 && caqiValue < 100) {
      mb.tray.setImage(
        path.join(__dirname, "../../src/images/mac/iconr@2x.png")
      );
    } else if (caqiValue >= 50 && caqiValue < 75) {
      mb.tray.setImage(
        path.join(__dirname, "../../src/images/mac/icono@2x.png")
      );
    } else if (caqiValue >= 30 && caqiValue < 50) {
      mb.tray.setImage(
        path.join(__dirname, "../../src/images/mac/icony@2x.png")
      );
    } else if (caqiValue >= 0 && caqiValue < 30) {
      mb.tray.setImage(
        path.join(__dirname, "../../src/images/mac/icong@2x.png")
      );
    }
  }
});

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createMenubar() {
  if (isDev) {
    const devTools = require("electron-devtools-installer");
    installExtension = devTools.default;
    REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
  }

  const appIndex = isDev
    ? "http://localhost:3000"
    : `file://${__dirname}/../../build/index.html`;

  const iconPath = path.join(__dirname, "../../src/images/mac/icon@2x.png");

  const mb = menubar({
    index: appIndex,
    icon: iconPath,
    tooltip: "SMOGbar",
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

ipcMain.on("saveTheme", (event, theme) => {
  settings.set("theme", theme);
  event.returnValue = "themeSaved";
});

ipcMain.on("getSavedTheme", (event) => {
  settings.get("theme").then((value) => {
    event.returnValue = value;
  });
});
