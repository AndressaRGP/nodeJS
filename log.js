//log.js for node.js

if (Function.prototype.bind && typeof console.log == "object"){
    [
      "log","info","warn","error","assert","dir","clear","profile","profileEnd"
    ].forEach(function (method) {
        console[method] = this.bind(console[method], console);
    }, Function.prototype.call);
}

log = {}
log.d = function() {
	var argArray = Array.prototype.slice.call(arguments,0)
	argArray[0] = '#'+argArray[0]
	console.log.apply(console,argArray)
}
log.i = function() {
	var argArray = Array.prototype.slice.call(arguments,0)
	argArray[0] = '#'+argArray[0]
	console.info.apply(console,argArray)
}
log.w = function() {
	var argArray = Array.prototype.slice.call(arguments,0)
	argArray[0] = '#'+argArray[0]
	console.warn.apply(console,argArray)
}
log.e = function() {
	var argArray = Array.prototype.slice.call(arguments,0)
	argArray[0] = '#'+argArray[0]
	console.error.apply(console,argArray)
}