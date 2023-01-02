import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import LogoAnimationStateProvider from '@/context/LogoAnimationState/provider'
import '@styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<LogoAnimationStateProvider>
				<App />
			</LogoAnimationStateProvider>
		</BrowserRouter>
	</React.StrictMode>
)
