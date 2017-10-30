'use strict'

// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'
import fs from 'fs'
import isImage from 'is-image'
import path from 'path'
import filesize from 'filesize'

if (process.env.NODE_ENV === 'development') {
  devtools()
}

// console.dir(app)
let win

app.on('before-quit', () => {
  console.log('saliendo...')
})

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hola mundo',
    center: true,
    maximizable: false,
    show: false // to use "readytoshow" and only open the app once the HTML content has been loaded
  })

  /* Showing the window after this event will have no visual flash
    ** This event is usually emitted after the did-finish-load event,
    but for pages with many remote resources, it may be emitted before the did-finish-load event.
  */
  win.once('ready-to-show', () => {
    win.show()
  })

  // win.on('move', () => {
  //   const position = win.getPosition()
  //   console.log(`la posición de la ventana es ${position}`)
  // })

  // Kill process once the window is closed
  win.on('closed', () => {
    app.quit()
  })

  // win.loadURL('http://www.youtube.com')
  win.loadURL(`file://${__dirname}/renderer/index.html`)
  // win.toggleDevTools()
})

// ipcMain.on('ping', (event, arg) => {
//   console.log(`se recibio ping ${arg}`)
//   event.sender.send('pong', new Date())
// })

ipcMain.on('open-directory', (event) => {
  dialog.showOpenDialog(win, {
    title: 'Seleccione la nueva ubicación',
    buttonLabel: 'Abrir ubicación',
    properties: [
      'openDirectory'
    ]
  }, (dir) => {
    let images = []
    if (dir) {
      fs.readdir(dir[0], (err, files) => {
        if (err) {
          throw err
        }

        for (let currentFile of files) {
          if (isImage(currentFile)) {
            let currentImagePath = path.join(dir[0], currentFile)
            let fileStats = fs.statSync(currentImagePath)
            let fileSize = filesize(fileStats.size, {round: 0})

            images.push({
              filename: currentFile,
              src: `file://${currentImagePath}`,
              size: fileSize
            })
          }
        }

        // console.log('About to send load-images', images)
        event.sender.send('load-images', images)
      })
    }
  })
})
