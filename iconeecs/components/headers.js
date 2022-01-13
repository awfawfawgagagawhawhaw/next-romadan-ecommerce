import { LogoIcon, SearchIcon, XIcon, HomeIcon, GridIcon, BagIcon, BellIcon, UserIcon, MoonIcon, SunIcon } from 'iconeecs'
import { useState, useEffect, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import styled from 'styled-components'
import { Themes } from 'iconeecs'
import Cookies from 'js-cookie'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'

const Text = styled.span`
	font-size: 1.3rem;
	font-weight: 500;
	cursor: pointer;

	&:hover {
		color: ${ Themes.Colors.Primary };
		transition: .5s;
	}
`

const Badge = styled.div`
	border: 5px solid ${ props => props.theme.secondary };
	background-color: ${ Themes.Colors.Primary };
	border-radius: 50%;
	position: absolute;
	height: 20px;
	width: 20px;
	right: 0;
	top: 0;
`

const Icons = styled.div`
	background-color: ${ props => props.shades ? props.theme.primary : 'transparent' };
	border-radius: 50%;
	position: relative;
	transition: .5s;
	height: 40px;
	width: 40px;

	svg, img {
		height: 24px;
		width: 24px;
	}

	img {
		border-radius: 50%;
	}

	&:hover {
		background-color: ${ props => props.theme.primary };

		svg {
			stroke: ${ Themes.Colors.Primary };
		}
	}
`

const Button = styled.button`
	background-color: ${ Themes.Colors.Primary };
	color: hsl(0, 0%, 100%);
	border-radius: 4px;
	font-weight: 500;
	padding: 0 30px;
	height: 40px;
`

const Input = styled.input`
	background-color: transparent;
	border: none;
	height: 40px;
	width: 100%;
`

const Form = styled.form`
	outline: 1px solid ${ props => props.theme.outline };
	border-radius: 5px;
	position: relative;
	display: flex;
	width: 100%;
`

const Menu = styled.div`
	height: 100%;
	width: 100%;
`

const Items = styled.div`
	align-items: center;
	display: flex;
	gap: 30px;
`

const Wrapper = styled.div`
	max-width: 1366px;
	display: flex;
	width: 100%;
`

const Container = styled.div`
	justify-content: center;
	padding: 0 30px;
	display: flex;
	width: 100%;
	z-index: 9;

	&:nth-child(1), &:nth-child(3) {
		background-color: ${ props => props.theme.background };
		height: 70px;
	}

	&:nth-child(1) {
		position: sticky;
		top: 0;

		${ Wrapper } {
			gap: 30px;

			${ Items } {
				&:nth-child(1) {
					display: ${ props => props.useSearch ? 'none' : 'flex' };
					justify-content: space-between;
					width: 100%;
				}

				&:nth-child(2) {
					display: ${ props => props.useSearch ? 'flex' : 'none' };
					width: 100%;

					${ Form } {
						${ Input } {
							padding: 0 40px;
						}

						${ Icons } {
							position: absolute;

							&:nth-child(2) {
								right: 0;
							}
						}
					}
				}

				&:nth-child(3) {
					display: none;
				}
			}
		}
	}

	&:nth-child(2) {
		background-color: ${ props => props.useMenu1 || props.useMenu2 || props.useMenu3 ? props.theme.backgroundMenu : 'transparent' };
		visibility: ${ props => props.useMenu1 || props.useMenu2 || props.useMenu3 ? 'visible' : 'hidden' };
		height: calc(100% - 140px);
		transition: .3s;
		position: fixed;
		padding: 30px;

		${ Wrapper } {
			justify-content: flex-end;

			${ Items } {
				visibility: ${ props => props.useMenu1 || props.useMenu2 || props.useMenu3 ? 'visible' : 'hidden' };
				margin-top: ${ props => props.useMenu1 || props.useMenu2 || props.useMenu3 ? '0' : '-30px' };
				opacity: ${ props => props.useMenu1 || props.useMenu2 || props.useMenu3 ? '1' : '0' };
				background-color: ${ props => props.theme.background };
				outline: 1px solid ${ props => props.theme.outline };
				box-shadow: ${ props => props.theme.shadow };
				border-radius: 5px;
				position: relative;
				transition: .3s;
				width: 100%;

				${ Menu } {
					position: absolute;

					&:nth-child(1) {
						visibility: ${ props => props.useMenu1 ? 'visible' : 'hidden' };
						opacity: ${ props => props.useMenu1 ? '1' : '0' };
						grid-template-rows: 50px 1fr auto;
						transition: .3s;
						display grid;

						& > div {
							&:nth-child(1) {
								border-bottom: 1px solid ${ props => props.theme.outline };
								justify-content: space-between;
								align-items: center;
								padding: 0 30px;
								display: flex;

								& > span {
									font-size: 1.3rem;
									font-weight: 500;

									&:nth-child(1) {

									}

									&:nth-child(2) {
										background-color: ${ Themes.Colors.Primary };
										color: hsl(0, 0%, 100%);
										place-items: center;
										border-radius: 5px;
										display: grid;
										height: 24px;
										width: 24px;
									}
								}
							}

							&:nth-child(2) {
								flex-direction: column;
								overflow-y: scroll;
								display: flex;
								padding: 30px;

								& > div {
									grid-template-columns: auto 1fr auto;
									grid-template-rows: 1fr auto;
									margin-bottom: 30px;
									display: grid;
									height: auto;
									width: 100%;
									gap: 15px;

									&:last-child {
										margin-bottom: 0;
									}

									& > *:last-child {
										margin-bottom: 0;
									}

									& > *:nth-child(1) {
										grid-row: 1 / span 2;
										grid-column: 1;

										& > span {
											background-color: ${ props => props.theme.secondary };
											place-items: center;
											border-radius: 5px;
											display: grid;
											height: 100px;
											width: 100px;

											& > img {
												object-fit: cover;
												height: 75px;
												width: 75px;
											}
										}
									}

									& > *:nth-child(2) {
										font-size: 1.3rem;
										font-weight: 500;
									}

									& > *:nth-child(3) {
										text-align: right;
									}

									& > *:nth-child(3), & > *:nth-child(4), & > *:nth-child(5) {
										font-size: 1.5rem;
										font-weight: 500;
									}
								}
							}

							&:nth-child(3) {
								border-top: 1px solid ${ props => props.theme.outline };
								padding: 15px 30px;

								button {
									background-color: ${ Themes.Colors.Primary };
									color: hsl(0, 0%, 100%);
									border-radius: 4px;
									height: 50px;
									width: 100%;
								}
							}
						}
					}

					&:nth-child(2) {
						visibility: ${ props => props.useMenu2 ? 'visible' : 'hidden' };
						opacity: ${ props => props.useMenu2 ? '1' : '0' };
						transition: .3s;
					}

					&:nth-child(3) {
						visibility: ${ props => props.useMenu3 ? 'visible' : 'hidden' };
						opacity: ${ props => props.useMenu3 ? '1' : '0' };
						transition: .3s;

						
					}
				}
			}
		}
	}

	&:nth-child(3) {
		position: fixed;
		bottom: 0;

		${ Wrapper } {
			${ Items } {
				justify-content: space-between;
				width: 100%;
			}
		}
	}

	@media (${ Themes.Device.Tablet }) {
		&:nth-child(1) {
			${ Wrapper } {
				${ Items } {
					&:nth-child(1) {
						display: flex;
						width: auto;

						${ Icons } {
							&:nth-child(1), &:nth-child(3) {
								display: none;
							}
						}
					}

					&:nth-child(2) {
						display: flex;

						${ Form } {
							max-width: 350px;

							${ Input } {
								padding-right: 15px;
							}

							${ Icons } {
								&:nth-child(2) {
									display: none;
								}
							}
						}
					}

					&:nth-child(3) {
						display: flex;
						width: auto;
					}
				}
			}
		}

		&:nth-child(2) {
			height: calc(100% - 70px);

			${ Wrapper } {
				${ Items } {
					max-width: 350px;
				}
			}
		}

		&:nth-child(3) {
			display: none;
		}
	}

	@media (${ Themes.Device.Laptop }) {
		padding: 0 50px;

		&:nth-child(1) {
			${ Wrapper } {

			}
		}

		&:nth-child(2) {
			padding: 30px 50px;

			${ Wrapper } {
				
			}
		}
	}
`

export const Headers = ({ HANDLE_THEMES }) => {

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data: cart_list, error: cart_list_error } = useSWR(session ? `/api/carts/${ session.id }` : null, fetcher, { refreshInterval: 1000 })

	const [ useMenu1, setUseMenu1 ] = useState(false)
	const [ useMenu2, setUseMenu2 ] = useState(false)
	const [ useMenu3, setUseMenu3 ] = useState(false)

	const [ useSearch, setUseSearch ] = useState(false)

	const HANDLE_SIGNOUT = () => {
		Cookies.remove('SESSION')
		dispatch({ type: 'LOADERS', payload: true })
		dispatch({ type: 'SESSION', payload: null })
		setUseMenu1(false), setUseMenu2(false), setUseMenu3(false)
	}

	return (
		<>
			<Container useSearch={ useSearch }>
				<Wrapper>
					<Items>
						<Icons as="button" onClick={ () => useSearch ? setUseSearch(false) : setUseSearch(true) }>
							<SearchIcon />
						</Icons>

						<Link href="/">
							<Icons as="button">
								<LogoIcon />
							</Icons>
						</Link>

						<Icons as="button" onClick={ HANDLE_THEMES }>
							<MoonIcon />
						</Icons>
					</Items>

					<Items>
						<Form>
							<Icons as="button" type="submit">
								<SearchIcon />
							</Icons>

							<Icons as="button" type="button" onClick={ () => useSearch ? setUseSearch(false) : setUseSearch(true) }>
								<XIcon />
							</Icons>

							<Input type="text" />
						</Form>
					</Items>

					<Items>
						<Link href="/">
							<Text onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>HOME</Text>
						</Link>

						<Link href="/products">
							<Text onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>PRODUCTS</Text>
						</Link>

						{
							session && session ? 
							<>
								{
									session && session.isAdmin && 
									<Link href="/admin">
										<Text onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>ADMIN</Text>
									</Link>
								}

								<Icons as="button" onClick={ () => useMenu1 ? setUseMenu1(false) : setUseMenu1(true) || setUseMenu2(false) || setUseMenu3(false) }>
									{ cart_list && cart_list.products.length > 0 && <Badge /> }
									<BagIcon />
								</Icons>

								<Icons as="button" onClick={ () => useMenu2 ? setUseMenu2(false) : setUseMenu1(false) || setUseMenu2(true) || setUseMenu3(false) }>
									<BellIcon />
								</Icons>

								<Icons as="button" shades onClick={ () => useMenu3 ? setUseMenu3(false) : setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(true) }>
									<img src="https://cliply.co/wp-content/uploads/2020/08/442008111_GLANCING_AVATAR_3D_400px.gif" />
								</Icons>
							</>
							:
							<>
								<Link href="/accounts">
									<Text>ACCOUNTS</Text>
								</Link>

								<Button>
									DOWNLOAD
								</Button>
							</>
						}

						<Icons as="button" onClick={ HANDLE_THEMES }>
							<MoonIcon />
						</Icons>
					</Items>
				</Wrapper>
			</Container>

			<Container useMenu1={ useMenu1 } useMenu2={ useMenu2 } useMenu3={ useMenu3 }>
				{
					session && session && 
					<Wrapper>
						<Items>
							<Menu>
								<div>
									<span>SHOPPING CART</span>
									<span>{ cart_list && cart_list.products.length }</span>
								</div>

								<div>
									{
										cart_list && cart_list.products.map(cart => (
											<div key={ cart.productID }>
												<span>
													<span>
														<img src={ cart.image } />
													</span>
												</span>

												<span>
													{ cart.name }
												</span>

												<span>
													x{ cart.quantity }
												</span>

												<span>
													{ cart.size }
												</span>

												<span>
													₱{ cart.price * cart.quantity }
												</span>
											</div>
										))
									}
								</div>

								<div>
									<Link href="/checkout">
										<button onClick={ () => useMenu1 ? setUseMenu1(false) : setUseMenu1(true) || setUseMenu2(false) || setUseMenu3(false) }>Checkout</button>
									</Link>
								</div>
							</Menu>

							<Menu>
								
							</Menu>

							<Menu>
								<Link href="/user">
									<Button onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>Profile</Button>
								</Link>

								<Link href="/settings">
									<Button onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>Settings</Button>
								</Link>

								<Button onClick={ HANDLE_SIGNOUT }>Sign Out</Button>
							</Menu>
						</Items>
					</Wrapper>
				}
			</Container>

			<Container>
				<Wrapper>
					<Items>
						<Link href="/">
							<Icons as="button" onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>
								<HomeIcon />
							</Icons>
						</Link>

						<Link href="/products">
							<Icons as="button" onClick={ () => setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(false) }>
								<GridIcon />
							</Icons>
						</Link>

						{
							session && session ? 
							<>
								<Icons as="button" onClick={ () => useMenu1 ? setUseMenu1(false) : setUseMenu1(true) || setUseMenu2(false) || setUseMenu3(false) }>
									{ cart_list && cart_list.products.length > 0 && <Badge /> }
									<BagIcon />
								</Icons>

								<Icons as="button" onClick={ () => useMenu2 ? setUseMenu2(false) : setUseMenu1(false) || setUseMenu2(true) || setUseMenu3(false) }>
									<BellIcon />
								</Icons>

								<div></div>

								<Icons as="button" shades onClick={ () => useMenu3 ? setUseMenu3(false) : setUseMenu1(false) || setUseMenu2(false) || setUseMenu3(true) }>
									<img src="https://cliply.co/wp-content/uploads/2020/08/442008111_GLANCING_AVATAR_3D_400px.gif" />
								</Icons>
							</>
							:
							<>
								<Link href="/accounts">
									<Icons as="button">
										<UserIcon />
									</Icons>
								</Link>

								<Link href="/">
									<Button>DOWNLOAD</Button>
								</Link>
							</>
						}
					</Items>
				</Wrapper>
			</Container>
		</>
	)
}