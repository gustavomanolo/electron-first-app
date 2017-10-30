function applyFilter (filter, currentImage) {
	// var imageDOM = document.querySelector('img.photo');
	let imgObj = new Image();
	imgObj.src = currentImage.src;

	filterous.importImage(imgObj, {}) // eslint-disable-line
	  .applyInstaFilter(filter)
	  .renderHtml(currentImage);
}

module.exports = applyFilter
