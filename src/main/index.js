import {app, BrowserWindow, Menu,ipcMain,screen} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    // let displays = screen.getAllDisplays();
    // let width;
    // for(var i in displays)
    // {
    //     width += displays[i].bounds.width;
    // }
    // let offsetRight = width - (260 + 0);

    mainWindow = new BrowserWindow({
        height: 350,
        useContentSize: true,
        width: 260,
        // x : offsetRight,
        // y : 100,
        frame: false,    //隐藏外部窗体
        resizable : false,
        maximizable : false,
        // opacity : 0.8,
    })
    Menu.setApplicationMenu(null);  //隐藏菜单

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

ipcMain.on('quitApp',()=>{
    app.quit()
})

ipcMain.on('min',()=>{
    mainWindow.minimize();
})

ipcMain.on('max',()=>{
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize()
    }
})