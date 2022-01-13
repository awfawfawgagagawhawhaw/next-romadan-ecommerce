import { Themes, CreditCardIcon, ArchiveIcon, CarIcon, CheckSquareIcon, XSquareIcon } from 'iconeecs'
import { useState, useEffect, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import axios from 'axios'

const Content = styled.div`
	grid-template-rows: auto 1fr;
	display: grid;
	gap: 30px;

	& > div {
		&:nth-child(1) {
			grid-template-columns: repeat(5, 1fr);
			overflow: hidden;
			display: grid;
			gap: 15px;

			& > button {
				border: 1px solid ${ props => props.theme.outline };
				background-color: transparent;
				place-items: center;
				border-radius: 5px;
				position: relative;
				font-size: 1.1rem;
				font-weight: 500;
				transition: .3s;
				padding: 15px 0;
				display: grid;
				gap: 8px;

				&:nth-child(1), &:nth-child(2), &:nth-child(3) {
					& > div {
						background-color: ${ Themes.Colors.Primary };
						color: hsl(0, 0%, 100%);
						place-items: center;
						border-radius: 50%;
						position: absolute;
						font-size: 1.0rem;
						font-weight: 500;
						display: grid;
						height: 24px;
						width: 24px;
						right: 10px;
						top: 10px;
					}

					& > span {
						place-items: center;
						display: grid;
						height: 30px;
						width: 30px;
					}
				}

				&:nth-child(4), &:nth-child(5) {
					&:nth-child(1) {
						place-items: center;
						display: grid;
						height: 30px;
						width: 30px;
					}
				}

				&:hover {
					background-color: ${ Themes.Colors.Primary };
					color: hsl(0, 0%, 100%);

					&:nth-child(1), &:nth-child(2), &:nth-child(3) {
						& > div {
							background-color: hsl(0, 0%, 100%);
							color: ${ Themes.Colors.Primary };
						}
					}

					& > span {
						&:nth-child(2) {
							svg {
								color: hsl(0, 0%, 100%);
							}
						}
					}
				}
			}
		}

		&:nth-child(2) {
							display: grid;
							height: auto;
							gap: 30px;

							& > div {
								border: 1px solid ${ props => props.theme.outline };
								box-shadow: ${ props => props.shadow };
								border-radius: 5px;
								padding: 30px;

								grid-template-columns: 300px 1fr;
								display: grid;
								gap: 30px;

								& > div {
									&:nth-child(1) {
										display: grid;
										gap: 30px;

										& > div {
											grid-template-columns: 125px 1fr;
											grid-template-rows: repeat(4, auto);
											height: 125px;
											display: grid;

											& > *:nth-child(1) {
												background-color: ${ props => props.theme.secondary };
												border-radius: 5px;
												grid-row: 1 / span 4;
												padding: 15px;
												grid-column: 1;

												& > img {
													object-fit: cover;
													height: 100%;
													width: 100%;
												}
											}

											& > *:nth-child(2), & > *:nth-child(3), & > *:nth-child(4), & > *:nth-child(5) {
												align-items: center;
												text-align: right;
												font-size: 1.3rem;
												font-weight: 500;
												display: grid;
											}
										}
									}

									&:nth-child(2) {
										border: 1px solid ${ props => props.theme.outline };
										grid-template-rows: repeat(6, auto) auto;
										grid-template-columns: auto 1fr;
										border-radius: 5px;
										padding: 30px;
										display: grid;
										gap: 15px;

										& > span {
											font-size: 1.3rem;
										}

										& > *:nth-child(2), & > *:nth-child(4), & > *:nth-child(6), *:nth-child(8), *:nth-child(10), *:nth-child(12) {
											text-align: right;
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
												background-color: transparent;
												color: hsl(0, 0%, 100%);
												border-radius: 3px;
												font-size: 1.0rem;
												padding: 5px 10px;
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

										& > *:nth-child(14) {
											justify-content: flex-end;
											grid-column: 1 /span 2;
											display: flex;

											& > button {
												background-color: ${ Themes.Colors.Primary };
												color: hsl(0, 0%, 100%);
												padding: 0 30px;
												border-radius: 5px;
												font-size: 1.3rem;
												font-weight: 500;
												height: 50px;
											}
										}
									}
								}
							}
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

const Orders = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	if ( session && !session.isAdmin ) {
		router.push('/')
		return null
	}

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data: orders, error: order_error } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 })

	const [ use1, setUse1 ] = useState(true)
	const [ use2, setUse2 ] = useState(false)
	const [ use3, setUse3 ] = useState(false)
	const [ use4, setUse4 ] = useState(false)
	const [ use5, setUse5 ] = useState(false)

	const HANDLE_TO_SHIP = async (id) => {
		await axios.post('/api/admin/orders/toship', {
			id
		})
	}

	const HANDLE_TO_RECEIVE = async (id) => {
		await axios.post('/api/admin/orders/toreceive', {
			id
		})
	}

	const HANDLE_SUCCESS = async (id) => {
		await axios.post('/api/admin/orders/success', {
			id
		})
	}

	const HANDLE_CANCELLED = () => {
		
	}

	return (
		<Container>
			<Wrapper>
				<Content>
					<div>
						<button style={{ backgroundColor: `${ use1 ? 'hsl(220, 100%, 50%)' : 'transparent' }`, color: `${ use1 ? 'hsl(0, 0%, 100%)' : 'currentColor' }` }} onClick={ () => !use1 && setUse1(true) || setUse2(false) || setUse3(false) || setUse4(false) || setUse5(false) }>
							<span>
								<CreditCardIcon />
							</span>

							to pay
						</button>

						<button style={{ backgroundColor: `${ use2 ? 'hsl(220, 100%, 50%)' : 'transparent' }`, color: `${ use2 ? 'hsl(0, 0%, 100%)' : 'currentColor' }` }} onClick={ () => !use2 && setUse1(false) || setUse2(true) || setUse3(false) || setUse4(false) || setUse5(false) }>
							<span>
								<ArchiveIcon />
							</span>

							to ship
						</button>

						<button style={{ backgroundColor: `${ use3 ? 'hsl(220, 100%, 50%)' : 'transparent' }`, color: `${ use3 ? 'hsl(0, 0%, 100%)' : 'currentColor' }` }} onClick={ () => !use3 && setUse1(false) || setUse2(false) || setUse3(true) || setUse4(false) || setUse5(false) }>
							<span>
								<CarIcon  />
							</span>

							to receive
						</button>

						<button style={{ backgroundColor: `${ use4 ? 'hsl(220, 100%, 50%)' : 'transparent' }`, color: `${ use4 ? 'hsl(0, 0%, 100%)' : 'currentColor' }` }} onClick={ () => !use4 && setUse1(false) || setUse2(false) || setUse3(false) || setUse4(true) || setUse5(false) }>
							<span>
								<CheckSquareIcon />
							</span>

							Success
						</button>

						<button style={{ backgroundColor: `${ use5 ? 'hsl(220, 100%, 50%)' : 'transparent' }`, color: `${ use5 ? 'hsl(0, 0%, 100%)' : 'currentColor' }` }} onClick={ () => !use5 && setUse1(false) || setUse2(false) || setUse3(false) || setUse4(false) || setUse5(true) }>
							<span>
								<XSquareIcon />
							</span>

							Cancelled
						</button>
					</div>

					{
						use1 && 
						<div>
							{
								orders && orders.map(order => (
									order.to_pay && 
									<div key={ order._id }>
										<div>
											{
												order.orders.map(ord => (
													<div key={ ord._id }>
													<span>
													<img src={ ord.image } />
													</span>
															
													<span>{ ord.name }</span>
													<span>₱{ ord.price }</span>
													<span>{ ord.size }</span>
													<span>x{ ord.quantity }</span>
													</div>
												))
											}
										</div>

										<div>
											<span>Order ID</span><span>{ order && order._id.toUpperCase() }</span>
											<span>Date</span><span>{ order && order.date }</span>
											<span>Subtotal</span><span>₱{ order && order.subtotal }</span>
											<span>Shipping</span><span>₱{ order && order.shipping }</span>
											<span>Total Order</span><span>₱{ order && order.total_order }</span>
											<span>Payment Method</span><span>{ order && order.payment_methods }</span>

											<div>
												<span>DELIVERY ADDRESS</span>
												<span></span>
												<span>{ order.firstname.toUpperCase() + ' ' + order.lastname.toUpperCase() }</span>
												<span>{ order.contact.toUpperCase() }</span>
												<span>{ order.houseno.toUpperCase() + ', ' + order.street.toUpperCase() + ', ' + order.barangay.toUpperCase() + ', ' + order.city.toUpperCase() + ', ' + order.region.toUpperCase() + ', ' + order.country.toUpperCase() }</span>
											</div>

											<span>
												<button onClick={ () => HANDLE_TO_SHIP(order._id) }>TO SHIP</button>
											</span>
										</div>
									</div>
								))
							}
						</div>
					}

					{
						use2 && 
						<div>
							{
								orders && orders.map(order => (
									order.to_ship && 
									<div key={ order._id }>
										<div>
											{
												order.orders.map(ord => (
													<div key={ ord._id }>
													<span>
													<img src={ ord.image } />
													</span>
															
													<span>{ ord.name }</span>
													<span>₱{ ord.price }</span>
													<span>{ ord.size }</span>
													<span>x{ ord.quantity }</span>
													</div>
												))
											}
										</div>

										<div>
											<span>Order ID</span><span>{ order && order._id.toUpperCase() }</span>
											<span>Date</span><span>{ order && order.date }</span>
											<span>Subtotal</span><span>₱{ order && order.subtotal }</span>
											<span>Shipping</span><span>₱{ order && order.shipping }</span>
											<span>Total Order</span><span>₱{ order && order.total_order }</span>
											<span>Payment Method</span><span>{ order && order.payment_methods }</span>

											<div>
												<span>DELIVERY ADDRESS</span>
												<span></span>
												<span>{ order.firstname.toUpperCase() + ' ' + order.lastname.toUpperCase() }</span>
												<span>{ order.contact.toUpperCase() }</span>
												<span>{ order.houseno.toUpperCase() + ', ' + order.street.toUpperCase() + ', ' + order.barangay.toUpperCase() + ', ' + order.city.toUpperCase() + ', ' + order.region.toUpperCase() + ', ' + order.country.toUpperCase() }</span>
											</div>

											<span>
												<button onClick={ () => HANDLE_TO_RECEIVE(order._id) }>TO RECEIVE</button>
											</span>
										</div>
									</div>
								))
							}
						</div>
					}

					{
						use3 && 
						<div>
							{
								orders && orders.map(order => (
									order.to_receive && 
									<div key={ order._id }>
										<div>
											{
												order.orders.map(ord => (
													<div key={ ord._id }>
													<span>
													<img src={ ord.image } />
													</span>
															
													<span>{ ord.name }</span>
													<span>₱{ ord.price }</span>
													<span>{ ord.size }</span>
													<span>x{ ord.quantity }</span>
													</div>
												))
											}
										</div>

										<div>
											<span>Order ID</span><span>{ order && order._id.toUpperCase() }</span>
											<span>Date</span><span>{ order && order.date }</span>
											<span>Subtotal</span><span>₱{ order && order.subtotal }</span>
											<span>Shipping</span><span>₱{ order && order.shipping }</span>
											<span>Total Order</span><span>₱{ order && order.total_order }</span>
											<span>Payment Method</span><span>{ order && order.payment_methods }</span>

											<div>
												<span>DELIVERY ADDRESS</span>
												<span></span>
												<span>{ order.firstname.toUpperCase() + ' ' + order.lastname.toUpperCase() }</span>
												<span>{ order.contact.toUpperCase() }</span>
												<span>{ order.houseno.toUpperCase() + ', ' + order.street.toUpperCase() + ', ' + order.barangay.toUpperCase() + ', ' + order.city.toUpperCase() + ', ' + order.region.toUpperCase() + ', ' + order.country.toUpperCase() }</span>
											</div>

											<span>
												<button onClick={ () => HANDLE_SUCCESS(order._id) }>ORDER RECEIVED</button>
											</span>
										</div>
									</div>
								))
							}
						</div>
					}

					{
						use4 && 
						<div>
							{
								orders && orders.map(order => (
									order.success && 
									<div key={ order._id }>
										<div>
											{
												order.orders.map(ord => (
													<div key={ ord._id }>
													<span>
													<img src={ ord.image } />
													</span>
															
													<span>{ ord.name }</span>
													<span>₱{ ord.price }</span>
													<span>{ ord.size }</span>
													<span>x{ ord.quantity }</span>
													</div>
												))
											}
										</div>

										<div>
											<span>Order ID</span><span>{ order && order._id.toUpperCase() }</span>
											<span>Date</span><span>{ order && order.date }</span>
											<span>Subtotal</span><span>₱{ order && order.subtotal }</span>
											<span>Shipping</span><span>₱{ order && order.shipping }</span>
											<span>Total Order</span><span>₱{ order && order.total_order }</span>
											<span>Payment Method</span><span>{ order && order.payment_methods }</span>

											<div>
												<span>DELIVERY ADDRESS</span>
												<span></span>
												<span>{ order.firstname.toUpperCase() + ' ' + order.lastname.toUpperCase() }</span>
												<span>{ order.contact.toUpperCase() }</span>
												<span>{ order.houseno.toUpperCase() + ', ' + order.street.toUpperCase() + ', ' + order.barangay.toUpperCase() + ', ' + order.city.toUpperCase() + ', ' + order.region.toUpperCase() + ', ' + order.country.toUpperCase() }</span>
											</div>

											<span>
												
											</span>
										</div>
									</div>
								))
							}
						</div>
					}

					{
						use5 && 
						<div>
							{
								orders && orders.map(order => (
									order.cancelled && 
									<div key={ order._id }>
										<div>
											{
												order.orders.map(ord => (
													<div key={ ord._id }>
													<span>
													<img src={ ord.image } />
													</span>
															
													<span>{ ord.name }</span>
													<span>₱{ ord.price }</span>
													<span>{ ord.size }</span>
													<span>x{ ord.quantity }</span>
													</div>
												))
											}
										</div>

										<div>
											<span>Order ID</span><span>{ order && order._id.toUpperCase() }</span>
											<span>Date</span><span>{ order && order.date }</span>
											<span>Subtotal</span><span>₱{ order && order.subtotal }</span>
											<span>Shipping</span><span>₱{ order && order.shipping }</span>
											<span>Total Order</span><span>₱{ order && order.total_order }</span>
											<span>Payment Method</span><span>{ order && order.payment_methods }</span>

											<div>
												<span>DELIVERY ADDRESS</span>
												<span></span>
												<span>{ order.firstname.toUpperCase() + ' ' + order.lastname.toUpperCase() }</span>
												<span>{ order.contact.toUpperCase() }</span>
												<span>{ order.houseno.toUpperCase() + ', ' + order.street.toUpperCase() + ', ' + order.barangay.toUpperCase() + ', ' + order.city.toUpperCase() + ', ' + order.region.toUpperCase() + ', ' + order.country.toUpperCase() }</span>
											</div>

											<span>
												
											</span>
										</div>
									</div>
								))
							}
						</div>
					}
				</Content>
			</Wrapper>
		</Container>
	)
}

export default Orders