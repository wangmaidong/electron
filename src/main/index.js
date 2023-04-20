const { app, BrowserWindow } = require('electron')

let mainWindow

const protocol = 'juejin'
const scheme = `${protocol}://`
app.setAsDefaultProtocolClient(protocol)

let urlParams = {}

handleSchemeWakeup(process.argv)

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, argv) => {
    mainWindow.restore()
    mainWindow.show()
    handleSchemeWakeup(argv)
  })
}

app.on('open-url', (event, url) => handleSchemeWakeup(url))

app.whenReady().then(() => {
  createWindow()
})

function createWindow() {
  const width = parseInt(urlParams.width) || 800
  const height = parseInt(urlParams.height) || 600
  const loadURL = urlParams.url || 'https://www.juejin.cn'
  console.log()
  if (mainWindow) {
    mainWindow.setSize(width, height)
  } else {
    mainWindow = new BrowserWindow({ width, height })
    mainWindow.loadURL(loadURL)
    mainWindow.webContents.openDevTools()
  }
}

function handleSchemeWakeup(argv) {
  const url = [].concat(argv).find((v) => v.startsWith(scheme))
  if (!url) return
  const searchParams = new URLSearchParams(url.slice(scheme.length))
  urlParams = Object.fromEntries(searchParams.entries())
  if (app.isReady()) createWindow()
}
