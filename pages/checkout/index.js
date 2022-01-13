import { useState, useEffect, useContext } from 'react'
import { Themes, Spinner2 } from 'iconeecs'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'

const Items = styled.div`
	border-bottom: 1px solid ${ props => props.theme.outline };
	grid-template-columns: auto 1fr auto;
	grid-template-rows: auto 1fr auto;
	padding: 30px 0;
	display: grid;
	height: auto;
	width: 100%;
	gap: 15px;

	& > *:nth-child(1) {
		grid-row: 1 / span 3;
		cursor: pointer;
		grid-column: 1;

		& > span {
			background-color: ${ props => props.theme.secondary };
			place-items: center;
			border-radius: 5px;
			display: grid;
			height: 150px;
			width: 150px;

			& > img {
				object-fit: cover;
				height: 100px;
				width: 100px;
			}
		}
	}

	& > *:nth-child(2) {
		align-items: center;
		cursor: pointer;
		grid-column: 2;
		display: flex;

		& > span {
			font-size: 1.5rem;
			font-weight: 600;
		}
	}

	& > *:nth-child(3) {
		grid-column: 2 / span 2;
		display: grid;
		grid-row: 2;
		gap: 10px;

		& > span {
			font-size: 1.5rem;
			font-weight: 500;
		}
	}

	& > *:nth-child(4) {
		text-align: right;
		grid-column: 3;

		& > button {
			color: ${ props => props.theme.outline };
			background-color: transparent;
			font-size: 1.5rem;
			transition: .3s;
			height: 30px;
			width: 30px;

			&:hover {
				color: ${ props => props.theme.text };
			}
		}
	}

	& > *:nth-child(5) {
		align-items: center;
		grid-column: 2;
		display: flex;
		grid-row: 3;

		& > span {
			font-size: 1.3rem;
		}
	}

	& > *:nth-child(6) {
		border: 1px solid ${ props => props.theme.outline };
		border-radius: 5px;
		overflow: hidden;
		grid-column: 3;
		grid-row: 3;

		& > button {
			background-color: ${ props => props.theme.secondary };
			font-size: 1.3rem;
			font-weight: 600;
			transition: .3s;
			height: 30px;
			width: 30px;

			&:hover {
				background-color: ${ Themes.Colors.Primary };
				color: hsl(0, 0%, 100%);
			}
		}

		& > span {
			font-size: 1.3rem;
			font-weight: 500;
			padding: 0 15px;
		}
	}
`

const Section = styled.div`
	
`

const Wrapper = styled.div`
	max-width: 1266px;
	width: 100%;
`

const Container = styled.div`
	height: calc(100vh - 140px);
	justify-content: center;
	overflow-y: scroll;
	display: flex;
	width: 100%;

	${ Wrapper } {
		grid-template-rows: auto auto;
		position: relative;
		overflow-y: scroll;
		padding: 30px;
		display: grid;
		gap: 50px;

		${ Section } {
			&:nth-child(1) {
				border-bottom: 1px solid ${ props => props.theme.outline };
				border-top: 1px solid ${ props => props.theme.outline };
				flex-direction: column;
				display: flex;

				& > *:last-child {
					border-bottom: none;
				}
			}

			&:nth-child(2) {
				outline: 1px solid ${ props => props.theme.outline };
				box-shadow: ${ props => props.theme.shadow };
				grid-template-rows: auto 1fr auto;
				border-radius: 5px;
				padding: 30px;
				display: grid;
				gap: 30px;

				& > div {
					&:nth-child(1) {
						& > span {
							place-items: center;
							font-size: 1.5rem;
							font-weight: 500;
							display: grid;
						}
					}

					&:nth-child(2) {
						overflow-y: scroll;

						& > div {
							grid-template-rows: auto auto auto auto;
							grid-template-columns: 1fr 1fr;
							display: grid;
							height: auto;
							width: 100%;
							gap: 15px;

							& > span {
								align-items: center;
								display: grid;

								&:nth-child(1), &:nth-child(3), &:nth-child(5) {
									font-size: 1.5rem;
								}

								&:nth-child(2), &:nth-child(4), &:nth-child(6) {
									font-size: 1.5rem;
									text-align: right;
									font-weight: 500;
								}
							}

							& > div {
								border: 2px dashed ${ props => props.theme.outline };
								background-color: ${ props => props.theme.primary };
								grid-template-rows: auto auto auto 1fr auto auto;
								grid-template-columns: 1fr auto;
								grid-column: 1 / span 2;
								border-radius: 5px;
								padding: 15px;
								display: grid;
								gap: 8px;

								& > * {
									font-size: 1.2rem;
								}

								& > *:nth-child(1) {
									align-items: center;
									font-weight: 500;
									grid-column: 1;
									display: grid;
								}

								& > *:nth-child(2) {
									background-color: ${ Themes.Colors.Primary };
									color: hsl(0, 0%, 100%);
									border-radius: 3px;
									font-size: 1.0rem;
									padding: 5px 10px;
									cursor: pointer;
									grid-column: 2;
								}

								& > *:nth-child(3) {
									grid-column: 1 / span 2;
									align-items: center;
									padding-top: 10px;
									font-weight: 500;
									display: grid;
									grid-row: 2;
								}

								& > *:nth-child(4) {
									grid-column: 1 / span 2;
									font-weight: 500;
									grid-row: 3;
								}

								& > *:nth-child(5) {
									grid-column: 1 / span 2;
									grid-row: 4;
								}
							}

							& > *:nth-child(8) {
								grid-column: 1 / span 2;
								font-size: 1.3rem;
								font-weight: 500;
							}

							& > *:nth-child(9), & > *:nth-child(10) {
								border: 1px solid ${ props => props.theme.outline };
								place-items: center;
								border-radius: 4px;
								font-size: 1.2rem;
								font-weight: 500;
								padding: 10px;
								display: flex;
								gap: 10px;

								input {
									background-color: transparent;
									font-size: 1.0rem;
								}
							}
						}
					}

					&:nth-child(3) {
						& > button {
							background-color: ${ Themes.Colors.Primary };
							color: hsl(0, 0%, 100%);
							border-radius: 4px;
							font-size: 1.3rem;
							font-weight: 500;
							height: 50px;
							width: 100%;
						}
					}
				}
			}
		}
	}

	@media (${ Themes.Device.Tablet }) {
		height: calc(100vh - 70px);
	}

	@media (${ Themes.Device.Laptop }) {
		${ Wrapper } {
			grid-template-columns: auto 350px;
			grid-template-rows: 1fr;
			padding: 30px 50px;

			${ Section } {
				&:nth-child(1) {
					
				}

				&:nth-child(2) {
					max-height: calc(100vh - 130px);
					position: sticky;
					top: 0;
				}
			}
		}
	}
`

const Checkout = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	if ( !session ) {
		router.push('/')
		return null
	}

	const setdate = new Date()
	const months = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ]
	const date_now = months[setdate.getMonth()] + ' ' + setdate.getDate() + ', ' + setdate.getFullYear()

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data: products, error: products_error } = useSWR('/api/products/', fetcher, { refreshInterval: 1000 })
	const { data: cart_list, error: cart_list_error } = useSWR(session ? `/api/carts/${ session.id }` : null, fetcher, { refreshInterval: 1000 })
	const [ useSpinner, setUseSpinner ] = useState(false)
	
	let total = 0
	let quantity = 0

	const [ userData, setUserData ] = useState({
		userID: session.id,
		orders: [{}],
		date: date_now,
		subtotal: 0,
		shipping: 0,
		total_order: 0,
		firstname: session && session.firstname,
		lastname: session && session.lastname,
		contact: session && session.contact,
		houseno: session && session.houseno,
		street: session && session.street,
		barangay: session && session.barangay,
		city: session && session.city,
		region: session && session.region,
		country: session && session.country,
		payment_methods: "Cash On Delivery"
	})
	const { userID, orders, date, subtotal, shipping, total_order, firstname, lastname, contact, houseno, street, barangay, city, region, country, payment_methods } = userData

	const HANDLE_INPUTS = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}

	const HANDLE_INCREMENT = async (userID, productID) => {
		setUseSpinner(true)

		await axios.post('/api/checkout/increment', {
			userID, productID
		}).then(response => {
			
		}).catch(error => {
			
		})
	}

	const HANDLE_DECREMENT = async (userID, productID) => {
		setUseSpinner(true)

		await axios.post('/api/checkout/decrement', {
			userID, productID
		}).then(response => {
			
		}).catch(error => {
			
		})
	}

	const HANDLE_DELETE = async (userID, productUID, productID) => {
		setUseSpinner(true)

		await axios.post('/api/checkout/remove', {
			userID, productUID, productID
		}).then(response => {
			
		}).catch(error => {

		})
	}

	const HANDLE_TOTAL = (price, quantity) => {
		total += (price * quantity)
	}

	useEffect(() => {
		setUseSpinner(false)
		setUserData({
			...userData,
			subtotal: total,
			orders: cart_list && cart_list.products,
			shipping: total >= 1500 ? 0 : 45,
			total_order: total >= 1500 ? total : (total + 45)
		})
	}, [ cart_list ])

	const HANDLE_ORDER = async () => {
		setUseSpinner(true)
		
		await axios.post('/api/orders/add', {
			userID, orders, date, subtotal, shipping, total_order, firstname, lastname, contact, houseno, street, barangay, city, region, country, payment_methods
		}).then(response => {
			router.push('/user')
		}).catch(error => {

		})
	}

	return (
		<Container>
			{ useSpinner && <Spinner2 /> }

			<Wrapper>
				<Section>
					{
						cart_list && cart_list.products.map(cart => (
							<Items key={ cart.productID }>
								<div>
									<Link href={`/products/${ cart.productID }`}>
										<span>
											<img src="../img.png" />
										</span>
									</Link>
								</div>

								<div>
									<Link href={`/products/${ cart.productID }`}>
										<span>{ cart.name }</span>
									</Link>
								</div>

								<div>
									<span>₱{ cart.price * cart.quantity }</span>
									<span>{ cart.size }</span>
								</div>

								<div>
									<button onClick={ () => HANDLE_DELETE(session && session.id, cart._id, cart.productID) }>✖</button>
								</div>

								<div>
									<span>
										In Stocks 
										({
											products && products.map(product => (
												product._id === cart.productID && 
												product.stock
											))
										})
									</span>
								</div>

								<div>
									<button onClick={ () => HANDLE_DECREMENT(session && session.id, cart.productID) } disabled={ cart.quantity <= 1 && true }>
										-
									</button>
									
									<span>
										{ cart.quantity }
									</span>

									<button onClick={ () => HANDLE_INCREMENT(session && session.id, cart.productID) }>
										+
									</button>
								</div>
							</Items>
						))
					}
				</Section>

				<Section>
					<div>
						<span>Order Summary</span>
					</div>

					<div>
						<div>
							{
								cart_list && cart_list.products.map(cart => (
									HANDLE_TOTAL(cart.price, cart.quantity)
								))
							}
							<span>Subtotal</span><span>₱{ total }</span>
							<span>Shipping</span><span>₱{ total >= 1500 ? '0' : '45' }</span>
							<span>Order Total</span><span>{ total >= 1500 ? total : (total + 45) }</span>

							<div>
								<span>DELIVERY ADDRESS</span>
								<Link href="/settings/address">
									<span as="button">Edit</span>
								</Link>
								<span>{ session && session.firstname.toUpperCase() + ' ' + session.lastname.toUpperCase() }</span>
								<span>{ session && session.contact }</span>
								<span>{ session && session.houseno + ', ' + session.street + ', ' + session.barangay + ', ' + session.city + ', ' + session.region + ', ' + session.country }</span>
							</div>

							<span>Payment Methods</span>

							<label title="Cash On Delivery">
								<input type="checkbox" name="payment_methods" checked readOnly={ true } />
								COD
							</label>

							<label style={{ cursor: 'not-allowed' }} title="not available">
								<input type="checkbox" name="payment_methods" value="G-CASH" onChange={ HANDLE_INPUTS } disabled={ true } />
								G-CASH
							</label>
						</div>
					</div>

					<div>
						<button onClick={ HANDLE_ORDER }>Place Order</button>
					</div>
				</Section>
			</Wrapper>
		</Container>
	)
}

export default Checkout