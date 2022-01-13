import { useState, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Themes } from 'iconeecs'
import Cookies from 'js-cookie'
import axios from 'axios'

const Content = styled.div`
	height: 100%;

	form {
		border: 1px solid ${ props => props.theme.outline };
		box-shadow: ${ props => props.theme.shadow };
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 50px);
		border-radius: 5px;
		padding: 30px;
		display: grid;
		height: auto;
		width: 100%;
		gap: 30px;

		& > * {
			outline: 1px solid ${ props => props.theme.outline };
			background-color: transparent;
			border-radius: 4px;
			padding: 0 15px;
			border: none;

			&::placeholder {
				
			}
		}

		& > *:last-child {
			background-color: ${ Themes.Colors.Primary };
			color: hsl(0, 0%, 100%);
			border: none;
		}
	}
`

const Wrapper = styled.div`
	border-left: 1px solid ${ props => props.theme.outline };
	max-height: calc(100vh - 130px);
	overflow-y: scroll;
	max-width: 1366px;
	padding: 0 30px;
	height: 100%;
	width: 100%;
`

const Container = styled.div`
	background-color: ${ props => props.theme.background };
	justify-content: center;
	padding: 30px 0;
	display: flex;
`

const Address = () => {

	const router = useRouter()
	
	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	const [ userData, setUserData ] = useState({ id: session && session.id, contact: '', houseno: '', street: '', barangay: '', city: '', region: '', country: '' })
	const { id, contact, houseno, street, barangay, city, region, country } = userData

	const HANDLE_INPUTS = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}

	const HANDLE_SUBMIT = (e) => {
		e.preventDefault()

		axios.post('/api/accounts/address', {
			id, contact, houseno, street, barangay, city, region, country
		}).then(response => {
			router.push('/user')
			const clone_data = JSON.stringify(response.data)
			Cookies.remove('SESSION')
			Cookies.set('SESSION', clone_data)
			dispatch({ type: 'SESSION', payload: response.data })
		}).catch(error => {

		})
	}

	return (
		<Container>
			<Wrapper>
				<Content>
					<form onSubmit={ HANDLE_SUBMIT }>
						<input type="text" placeholder="Contact" name="contact" maxLength="11" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="House No." name="houseno" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Street" name="street" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Barangay" name="barangay" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="City" name="city" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Region" name="region" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Country" name="country" onChange={ HANDLE_INPUTS } />
						<input type="submit" value="Save" />
					</form>
				</Content>
			</Wrapper>
		</Container>
	)
}

export default Address