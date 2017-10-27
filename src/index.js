'use strict'

// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

if (process.env.NODE_ENV === 'development') {
  devtools()
}

// console.dir(app)

app.on('before-quit', () => {
  console.log('saliendo...')
})

app.on('ready', () => {
  let win = new BrowserWindow({
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

  win.on('move', () => {
    const position = win.getPosition()
    console.log(`la posición de la ventana es ${position}`)
  })

  // Kill process once the window is closed
  win.on('closed', () => {
    app.quit()
  })

  // win.loadURL('http://www.youtube.com')
  win.loadURL(`file://${__dirname}/renderer/index.html`)
  // win.toggleDevTools()
})
