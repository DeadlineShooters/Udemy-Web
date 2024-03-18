const plugin = require('tailwindcss/plugin');
const withMT = require('@material-tailwind/react/utils/withMT');
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				cabin: ['Cabin', 'sans-serif'],
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		plugin(function ({ addComponents }) {
			const cardContainer = {
				'.cardContainer': {
					width: '100%',
					marginLeft: 'auto',
					marginRight: 'auto',
					'@screen sm': { maxWidth: '730px' },
					'@screen md': { maxWidth: '770px' },
					'@screen lg': { maxWidth: '1024px' },
					'@screen xl': { maxWidth: '1024px' },
					'@screen 2xl': { maxWidth: '1024px' },
				},
			};
			addComponents(cardContainer);
		}),
	],
	important: true,
	mode: 'jit',
});
