import { useState, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Themes } from 'iconeecs'
import  Link from 'next/link'
import axios from 'axios'

const Content = styled.div`
	place-items: center;
	padding: 30px 0;
	display: grid;
	height: 100%;
	gap: 30px;

	& > form {
		border: 1px solid ${ props => props.theme.outline };
		box-shadow: ${ props => props.theme.shadow };
		border-radius: 4px;
		padding: 30px;
		width: 400px;

		& > input {
			outline: 1px solid ${ props => props.theme.outline };
			background-color: transparent;
			border-radius: 4px;
			padding: 0 15px;
			border: none;
			height: 50px;
			width: 100%;
		}

		& > span {
			grid-template-columns: 1fr 1fr;
			display: grid;
			gap: 30px;

			input {
				border-radius: 4px;
				height: 50px;

				&[type=button] {
					background-color: ${ props => props.theme.secondary };
				}

				&[type=submit] {
					background-color: ${ Themes.Colors.Primary };
					color: hsl(0, 0%, 100%);
				}
			}
		}

		& > * {
			margin-bottom: 30px;
		}

		& > *:last-child {
			margin-bottom: 0;
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

const Add = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	if ( session && !session.isAdmin ) {
		router.push('/')
		return null
	}
	
	const [ userData, setUserData ] = useState({ image: '', name: '', price: '', size: '', stock: '', image: '' })
	const { name, price, size, stock, image } = userData

	const HANDLE_INPUTS = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}

	const HANDLE_SUBMIT = async (e) => {
		e.preventDefault()

		await axios.post('/api/admin/products/add', {
			name, price, size, stock, image
		}).then(response => {

		}).catch(error => {

		})
	}

	return (
		<Container>
			<Wrapper>
				<Content>
					<form onSubmit={ HANDLE_SUBMIT }>
						<input type="text" placeholder="Image URL" name="image" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Product Name" name="name" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Price" name="price" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Size" name="size" onChange={ HANDLE_INPUTS } />
						<input type="text" placeholder="Stock" name="stock" onChange={ HANDLE_INPUTS } />
						
						<span>
							<Link href="/admin/products">
								<input type="button" value="Cancel" />
							</Link>

							<input type="submit" value="Submit" />
						</span>
					</form>
				</Content>
			</Wrapper>
		</Container>
	)
}

export default Add