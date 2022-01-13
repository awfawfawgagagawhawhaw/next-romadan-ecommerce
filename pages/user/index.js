import { Themes, CreditCardIcon, ArchiveIcon, CarIcon, CheckSquareIcon, XSquareIcon } from 'iconeecs'
import { useState, useEffect, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import axios from 'axios'

const Content = styled.div`
	grid-template-rows: 350px auto 500px;
	min-height: 100%;
	display: grid;
	gap: 30px;

	& > div {
		&:nth-child(1) {
			background-color: ${ props => props.theme.secondary };
			place-items: center;
			border-radius: 5px;
			display: grid;

			& > div {
				outline: 10px solid ${ props => props.theme.background };
				background-color: ${ props => props.theme.background };
				border-radius: 50%;
				overflow: hidden;
				height: 150px;
				width: 150px;

				& > img {
					object-fit: cover;
					height: 100%;
					width: 100%;
				}
			}
		}

		&:nth-child(2) {
			justify-content: center;
			align-items: center;
			display: flex;
			gap: 15px;

			& > span {
				&:nth-child(1) {
					place-items: center;
					font-size: 3.0rem;
					font-weight: 800;
					display: grid;
				}

				&:nth-child(2) {
					background-color: ${ Themes.Colors.Primary };
					outline: 5px solid hsla(220, 100%, 50%, .1);
					place-items: center;
					border-radius: 50%;
					display: grid;
					height: 24px;
					width: 24px;

					svg {
						color: hsl(0, 0%, 100%);
						height: 14px;
						width: 14px;
					}
				}
			}
		}

		&:nth-child(3) {
			border-top: 1px solid ${ props => props.theme.outline };
			grid-template-columns: 1fr 300px;
			padding-top: 30px;
			display: grid;
			gap: 30px;

			& > div {
				&:nth-child(1) {
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
				}

				&:nth-child(2) {
					& > div {
						grid-template-rows: auto 1fr;
						display: grid;
						height: 300px;
						gap: 30px;

						& > div {
							&:nth-child(1) {
								grid-template-columns: 1fr auto;
								grid-template-rows: auto 10px;
								display: grid;
								gap: 15px;

								& > *:nth-child(1), & > *:nth-child(2) {
									font-size: 1.5rem;
									font-weight: 500;
								}

								& > *:nth-child(3) {
									background-color: ${ props => props.theme.secondary };
									grid-column: 1 / span 2;
									border-radius: 50px;

									& > span {
										background-color: ${ Themes.Colors.Primary };
										border-radius: 50px;
										display: grid;
										height: 100%;
										width: 50%;
									}
								}
							}

							&:nth-child(2) {
								background-color: ${ props => props.theme.secondary };
								border-radius: 5px;
							}
						}
					}
				}
			}
		}
	}
`

const Wrapper = styled.div`
	max-height: calc(100vh - 70px);
	overflow-y: scroll;
	max-width: 1266px;
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

const User = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data: orders, error: order_error } = useSWR('/api/orders', fetcher, { refreshInterval: 1000 })

	if ( session === null ) {
		router.push('/')
	}

	const [ use1, setUse1 ] = useState(true)
	const [ use2, setUse2 ] = useState(false)
	const [ use3, setUse3 ] = useState(false)
	const [ use4, setUse4 ] = useState(false)
	const [ use5, setUse5 ] = useState(false)

	let progress = 0

	if ( session && session.firstname ) {
		progress += 10
	}

	if ( session && session.lastname ) {
		progress += 10
	}

	if ( session && session.email ) {
		progress += 10
	}

	if ( session && session.contact ) {
		progress += 10
	}

	if ( session && session.houseno ) {
		progress += 10
	}

	if ( session && session.street ) {
		progress += 10
	}

	if ( session && session.barangay ) {
		progress += 10
	}

	if ( session && session.city ) {
		progress += 10
	}

	if ( session && session.region ) {
		progress += 10
	}

	if ( session && session.country ) {
		progress += 10
	}

	const HANDLE_CANCEL = async (id) => {
		await axios.post('/api/admin/orders/cancel', {
			id
		})
	}

	return (
		<Container>
			<Wrapper>
				<Content>
					<div>
						<div>
							<img src="https://cliply.co/wp-content/uploads/2020/08/442008111_GLANCING_AVATAR_3D_400px.gif" />
						</div>
					</div>

					<div>
						<span>{ session && session.firstname.toUpperCase() + ' ' + session.lastname.toUpperCase() }</span>

						{
							session && session.isAdmin && 
							<span title="verified">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
							</span>
						}
					</div>

					<div>
						<div>
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
											session && session.id === order.userID && order.to_pay && 
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
													<span>Order ID</span><span>{ order._id.toUpperCase() }</span>
													<span>Date</span><span>{ order.date }</span>
													<span>Subtotal</span><span>₱{ order.subtotal }</span>
													<span>Shipping</span><span>₱{ order.shipping }</span>
													<span>Total Order</span><span>₱{ order.total_order }</span>
													<span>Payment Method</span><span>{ order.payment_methods }</span>

													<div>
														<span>DELIVERY ADDRESS</span>
														<span></span>
														<span>{ session && session.firstname.toUpperCase() + ' ' + session.lastname.toUpperCase() }</span>
														<span>{ session && session.contact }</span>
														<span>{ session && session.houseno + ', ' + session.street + ', ' + session.barangay + ', ' + session.city + ', ' + session.region + ', ' + session.country }</span>
													</div>

													<span>
														<button onClick={ () => HANDLE_CANCEL(order._id) }>CANCEL ORDER</button>
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
											session && session.id === order.userID && order.to_ship && 
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
													<span>Order ID</span><span>{ order._id.toUpperCase() }</span>
													<span>Date</span><span>{ order.date }</span>
													<span>Subtotal</span><span>₱{ order.subtotal }</span>
													<span>Shipping</span><span>₱{ order.shipping }</span>
													<span>Total Order</span><span>₱{ order.total_order }</span>
													<span>Payment Method</span><span>{ order.payment_methods }</span>

													<div>
														<span>DELIVERY ADDRESS</span>
														<span></span>
														<span>{ session && session.firstname.toUpperCase() + ' ' + session.lastname.toUpperCase() }</span>
														<span>{ session && session.contact }</span>
														<span>{ session && session.houseno + ', ' + session.street + ', ' + session.barangay + ', ' + session.city + ', ' + session.region + ', ' + session.country }</span>
													</div>
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
											session && session.id === order.userID && order.to_receive && 
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
													<span>Order ID</span><span>{ order._id.toUpperCase() }</span>
													<span>Date</span><span>{ order.date }</span>
													<span>Subtotal</span><span>₱{ order.subtotal }</span>
													<span>Shipping</span><span>₱{ order.shipping }</span>
													<span>Total Order</span><span>₱{ order.total_order }</span>
													<span>Payment Method</span><span>{ order.payment_methods }</span>

													<div>
														<span>DELIVERY ADDRESS</span>
														<span></span>
														<span>{ session && session.firstname.toUpperCase() + ' ' + session.lastname.toUpperCase() }</span>
														<span>{ session && session.contact }</span>
														<span>{ session && session.houseno + ', ' + session.street + ', ' + session.barangay + ', ' + session.city + ', ' + session.region + ', ' + session.country }</span>
													</div>
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
											session && session.id === order.userID && order.success && 
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
													<span>Order ID</span><span>{ order._id.toUpperCase() }</span>
													<span>Date</span><span>{ order.date }</span>
													<span>Subtotal</span><span>₱{ order.subtotal }</span>
													<span>Shipping</span><span>₱{ order.shipping }</span>
													<span>Total Order</span><span>₱{ order.total_order }</span>
													<span>Payment Method</span><span>{ order.payment_methods }</span>

													<div>
														<span>DELIVERY ADDRESS</span>
														<span></span>
														<span>{ session && session.firstname.toUpperCase() + ' ' + session.lastname.toUpperCase() }</span>
														<span>{ session && session.contact }</span>
														<span>{ session && session.houseno + ', ' + session.street + ', ' + session.barangay + ', ' + session.city + ', ' + session.region + ', ' + session.country }</span>
													</div>
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
											session && session.id === order.userID && order.cancelled && 
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
													<span>Order ID</span><span>{ order._id.toUpperCase() }</span>
													<span>Date</span><span>{ order.date }</span>
													<span>Subtotal</span><span>₱{ order.subtotal }</span>
													<span>Shipping</span><span>₱{ order.shipping }</span>
													<span>Total Order</span><span>₱{ order.total_order }</span>
													<span>Payment Method</span><span>{ order.payment_methods }</span>

													<div>
														<span>DELIVERY ADDRESS</span>
														<span></span>
														<span>{ order.firstname.toUpperCase() + ' ' + order.lastname.toUpperCase() }</span>
														<span>{ order.contact.toUpperCase() }</span>
														<span>{ order.houseno.toUpperCase() + ', ' + order.street.toUpperCase() + ', ' + order.barangay.toUpperCase() + ', ' + order.city.toUpperCase() + ', ' + order.region.toUpperCase() + ', ' + order.country.toUpperCase() }</span>
													</div>
												</div>
											</div>
										))
									}
								</div>
							}
						</div>

						<div>
							<div>
								<div>
									<span>Profile Completion</span>
									<span>{ progress }%</span>

									<span>
										<span style={{ width: `${ progress }%` }}></span>
									</span>
								</div>

								<div>
									
								</div>
							</div>
						</div>
					</div>
				</Content>
			</Wrapper>
		</Container>
	)
}

export default User