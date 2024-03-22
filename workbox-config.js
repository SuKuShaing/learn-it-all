module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,png,ico,html,json,md,css,svg}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};