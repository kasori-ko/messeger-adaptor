String.prototype.dedent = function () {
	return this.toString().replace(/(?:\t)/g, '')
}