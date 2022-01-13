import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

export const Iconeecs = createContext()

const initialState = {
	appmode: Cookies.get('DARKMODE') ? JSON.parse(Cookies.get('DARKMODE')) : { darkmode: false },
	loaders: true,
	pending: null,
	session: Cookies.get('SESSION') ? JSON.parse(Cookies.get('SESSION')) : null
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'APPMODE':
			return {
				...state,
				appmode: action.payload
			}

		case 'LOADERS':
			return {
				...state,
				loaders: action.payload
			}

		case 'PENDING':
			return {
				...state,
				pending: action.payload
			}

		case 'SESSION':
			return {
				...state,
				session: action.payload
			}

		default:
			return state
	}
}

export const IconeecsProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initialState)
	const value = { state, dispatch }

	return (
		<Iconeecs.Provider value={ value }>
			{ children }
		</Iconeecs.Provider>
	)
}