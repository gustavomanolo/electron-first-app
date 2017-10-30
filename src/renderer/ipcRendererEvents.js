import { ipcRenderer } from 'electron'

function setIpc () {
	ipcRenderer.on('load-images', (event, images) => {
		console.log(`-> Render images `, images[0].size)
	})
}

function sendIpc () {
	ipcRenderer.send('ping', new Date())
}


function openDirectory () {
	console.log('-> open directory!')
	ipcRenderer.send('open-directory')
}

module.exports = {
	setIpc,
	sendIpc,
	openDirectory
}
