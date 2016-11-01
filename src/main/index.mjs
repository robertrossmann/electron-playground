import electron from 'electron'
import path from 'path'

// eslint-disable-next-line no-process-env
const env = process.env.NODE_ENV || 'development'
// All the application windows currently open
const windows = new Set()

// Quit when all windows are closed
electron.app.on('window-all-closed', () =>
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  process.platform !== 'darwin'
    ? electron.app.quit()
    : null
)

// Electron is ready to serve, open the main view
electron.app.once('ready', mkwindow)

if (env === 'development') {
  /* eslint-disable global-require */
  const devtron = require('devtron')
  const {
    default: install,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer')
  /* eslint-enable global-require */

  electron.app.once('ready', () => devtron.install())
  electron.app.once('ready', () => install(REACT_DEVELOPER_TOOLS))
  electron.app.once('ready', () => install(REDUX_DEVTOOLS))
}

// Someone clicked the application icon!
electron.app.on('activate', () => {
  if (!windows.size) {
    mkwindow()
  }
})

/**
 *  Create a new main window
 *
 *  @private
 *  @return    {void}
 */
function mkwindow() {
  const view = path.join(__dirname, '..', 'renderer', 'index.html')
  const window = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
  })

  windows.add(window)
  window.once('closed', () => windows.delete(window))
  window.webContents.once('did-finish-load', () => {
    window.show()
    window.focus()
    env === 'development' && window.toggleDevTools()
  })

  window.loadURL(`file://${view}`)
}
