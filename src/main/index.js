const { app, BrowserWindow } = require('electron');
let path = require('path')
let mainWindow;
const protocol = 'zhufeng';
const scheme = `${protocol}://`;
app.setAsDefaultProtocolClient(protocol);

let urlParams = {};

handleSchemeWakeup(process.argv);

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, argv) => {
    mainWindow.restore();
    mainWindow.show();
    handleSchemeWakeup(argv);
  });
}

app.on('open-url', (event, url) => handleSchemeWakeup(url));

app.whenReady().then(() => {
  createWindow();
});

function createWindow() {
  console.log('urlParams---->', urlParams);
  const width = parseInt(urlParams.width) || 800;
  const height = parseInt(urlParams.height) || 600;
  const { url = 'http://www.javascriptpeixun.cn/my/courses/learning' } = urlParams;
  if (mainWindow) {
    mainWindow.setSize(width, height);
  } else {
    mainWindow = new BrowserWindow({ width, height,
      webPreferences: {
        nodeIntegration: false,
        sandbox: false, // 从 Electron 20 版本开始，渲染进程默认开启沙箱模式，需要指定 sandbox: false才行 否则会报module not found
        preload: path.join(__dirname, '../preload/index.js')
      }
     });
    // mainWindow.loadURL(url);
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    mainWindow.webContents.openDevTools();
  }
}

function handleSchemeWakeup(argv) {
  const url = [].concat(argv).find((v) => v.startsWith(scheme));
  if (!url) return;
  const searchParams = new URLSearchParams(url.slice(scheme.length));
  urlParams = Object.fromEntries(searchParams.entries());
  if (app.isReady()) createWindow();
}
