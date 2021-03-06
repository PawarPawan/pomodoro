/**
 * @project MyFocus
 * @name electron
 * @author Pawan Pawar
 * @date 5/10/18 - 9:17 AM
 * @description
 *
 */

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, icon: path.join(__dirname, 'dist/assets/bell-icon.png')})

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  win.webContents.openDevTools();
  win.webContents.on("devtools-opened", () => {
    mainWindow.webContents.closeDevTools();
  });

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
