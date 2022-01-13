import MessengerCustomerChat from 'react-messenger-customer-chat'
import { useState, useEffect, useContext } from 'react'
import { ThemeProvider } from 'styled-components'
import Router, { useRouter } from 'next/router'
import { GlobalStyles } from '../globals'
import { Iconeecs } from 'sources/stores'
import styled from 'styled-components'
import { AppMode } from './appmode'
import { Loaders } from './loaders'
import { Spinner } from './spinner'
import { Headers } from './headers'
import { Sidebar } from './sidebar'
import { FadeIn } from '../animate'
import { Themes } from '../themes'
import Cookies from 'js-cookie'

const Wrapper = styled.div`
	grid-template-columns: 250px 1fr;
	height: calc(100vh - 70px);
	grid-template-rows: 1fr;
	justify-self: center;
	overflow-y: scroll;
	display: grid;
`

const Container = styled.div`
	animation: ${ FadeIn } 1s ease;
	position: relative;
	min-height: 100vh;
`

export const Content = ({ children }) => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session, appmode, loaders } = state

	const [ useAppMode, setUseAppMode ] = useState(appmode.darkmode)
	const [ useLoaders, setUseLoaders ] = useState(loaders)
	const [ useSpinner, setUseSpinner ] = useState(false)
	const [ useSwitch, setUseSwitch ] = useState(false)

	const HANDLE_THEMES = () => {
		setUseSwitch(true)
		
		let timer = setTimeout(() => {
			setUseSwitch(false)

			if ( appmode.darkmode ) {
				dispatch({ type: 'APPMODE', payload: { darkmode: false } })
			} else {
				dispatch({ type: 'APPMODE', payload: { darkmode: true } })
			}
		}, 3000)

		return () => {
			clearTimeout(timer)
		}
	}

	useEffect(() => {
		setUseLoaders(loaders)

		let timer = setTimeout(() => {
			setUseLoaders(false)
			dispatch({ type: 'LOADERS', payload: false })
		}, 3000)

		return () => {
			clearTimeout(timer)
		}
	}, [ loaders ])

	Cookies.set('DARKMODE', JSON.stringify(appmode))

	Router.events.on('routeChangeStart', (url) => {
		setUseSpinner(true)
	})

	Router.events.on('routeChangeComplete', (url) => {
		setUseSpinner(false)
	})

	return (
		<ThemeProvider theme={ appmode.darkmode ? Themes.DarkMode : Themes.LightMode }>
			<GlobalStyles />

			{
				useLoaders ? <Loaders /> : useSwitch ? <AppMode /> : 
				<>
					{ useSpinner && <Spinner /> }
					
					<Container>
						{ router.pathname !== '/accounts' && <Headers HANDLE_THEMES={ HANDLE_THEMES } /> }
						{
							router.pathname === '/admin' || router.pathname === '/admin/orders' || router.pathname === '/admin/products' || router.pathname === '/admin/products/add' ? 
							<Wrapper>
								<Sidebar />
								{ children }
							</Wrapper>
							:
							<>
								{ children }
							</>
						}
						{ router.pathname !== '/accounts' && <MessengerCustomerChat pageId="103164575552883" appId="439254404257879" /> }
					</Container>
				</>
			}
		</ThemeProvider>
	)
}