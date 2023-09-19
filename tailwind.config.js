/** @type {import('tailwindcss').Config} */

const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		screens: {
			xs: "375px",
			sm: "576px",
			md: "768px",
			lg: "1024px",
			xl: "1200px",
			xxl: "1440px",
		},

		extend: {
			colors: {
				primary: {},
			},
		},
	},

	plugins: [],
};

export default config;
