const { app, BrowserWindow } = require('electron');

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
  console.log();
  if (mainWindow) {
    mainWindow.setSize(width, height);
  } else {
    mainWindow = new BrowserWindow({ width, height });
    mainWindow.loadURL(url);
    // mainWindow.webContents.openDevTools();
  }
}

function handleSchemeWakeup(argv) {
  console.log('argv---->', argv);
  const url = [].concat(argv).find((v) => v.startsWith(scheme));
  if (!url) return;
  const searchParams = new URLSearchParams(url.slice(scheme.length));
  urlParams = Object.fromEntries(searchParams.entries());
  if (app.isReady()) createWindow();
}
