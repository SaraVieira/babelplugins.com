import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class Document extends React.Component {
	static getInitialProps({ assets, data, renderPage }) {
		const sheet = new ServerStyleSheet()
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)
		const styleTags = sheet.getStyleElement()
		return { assets, data, ...page, styleTags }
	}

	render() {
		const { helmet, assets, data, styleTags } = this.props
		// get attributes from React Helmet
		const htmlAttrs = helmet.htmlAttributes.toComponent()
		const bodyAttrs = helmet.bodyAttributes.toComponent()

		return (
			<html {...htmlAttrs}>
				<head>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta charSet="utf-8" />
					<title>Babel Plugins</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{helmet.title.toComponent()}
					{helmet.meta.toComponent()}
					{helmet.link.toComponent()}
					{styleTags}
				</head>
				<body {...bodyAttrs}>
					<div id="root">DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP</div>
					<script
						id="server-app-state"
						type="application/json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({ ...data }).replace(
								/<\/script>/g,
								'%3C/script%3E'
							),
						}}
					/>
					<script
						type="text/javascript"
						src={assets.client.js}
						defer
						crossOrigin="anonymous"
					/>
				</body>
			</html>
		)
	}
}
