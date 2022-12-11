import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import * as dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5500,
		open: true,
		strictPort: true,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@lottie': path.resolve(__dirname, './src/static/lottie'),
			'@components': path.resolve(__dirname, './src/components'),
			'@styles': path.resolve(__dirname, './src/scss'),
			'@images': path.resolve(__dirname, './src/static/img'),
		},
	},
})
