
var React = require("react");
var ReactDOMServer = require("react-dom/server");

var Application = require("../client/src/App").default;

var styleCollector = require("./style-collector");

module.exports = function(req, scriptFilename) {

	var html;
	var css = styleCollector.collect(function() {
		html = ReactDOMServer.renderToString(<Application url={req.url}/>);
	});
	return ReactDOMServer.renderToString(
		<html>
			<head>
				<style id="server-side-style" dangerouslySetInnerHTML={{__html: css}} />
			</head>
			<body>
				<div id="content" dangerouslySetInnerHTML={{__html: html}} />
				<script src={"assets/" + scriptFilename}></script>
			</body>
		</html>
	);
}
