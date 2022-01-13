import { useState, useEffect, useContext } from 'react'
import { Themes, Spinner2 } from 'iconeecs'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'

const Message = styled.div`
	background-color: ${ props => props.theme.backgroundMenu };
	transition: .3s;
	position: fixed;
	padding: 50px;
	height: 100%;
	width: 100%;
	z-index: 999;
	top: 0;

	& > span {
		background-color: ${ Themes.Colors.Primary };
		color: hsl(0, 0%, 100%);
		border-radius: 4px;
		position: absolute;
		bottom: 50px;
		display: flex;
		width: 250px;
		height: auto;
		padding: 30px;
	}
`

const Items = styled.div`
	
`

const Section = styled.div`
	
`

const Wrapper = styled.div`
	position: relative;
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
				outline: 1px solid ${ props => props.theme.outline };
				box-shadow: ${ props => props.theme.shadow };
				place-items: center;
				border-radius: 5px;
				padding: 50px;
				display: grid;

				& > img {
					height: auto;
					width: 100%;
				}
			}

			&:nth-child(2) {
				grid-template-rows: auto auto 1fr auto;
				grid-template-columns: 1fr 1fr;
				display: grid;
				gap: 30px;

				& > *:nth-child(1) {
					& > span {
						display: flex;

						& > h5 {
							background-color: ${ Themes.Colors.Primary };
							color: hsl(0, 0%, 100%);
							border-radius: 4px;
							padding: 8px 15px;
						}
					}
				}

				& > *:nth-child(2) {
					& > span {
						justify-content: flex-end;
						display: flex;

						& > h5 {
							background-color: ${ props => props.theme.secondary };
							border-radius: 4px;
							padding: 8px 15px;
						}
					}
				}

				& > *:nth-child(3) {
					text-align: left;

					& > span {
						font-size: 2.5rem;
						font-weight: 800;
					}
				}

				& > *:nth-child(4) {
					text-align: right;

					& > span {
						font-size: 2.5rem;
						font-weight: 800;
					}
				}

				& > *:nth-child(5) {
					grid-column: 1 / span 2;

					& > span {
						text-align: center;
						display: flex;

						& > p {
							background-color: ${ props => props.theme.secondary };
							border-radius: 5px;
							font-size: 1.3rem;
							padding: 30px;
							height: auto;
						}
					}
				}

				& > *:nth-child(6) {
					& > button {
						background-color: ${ props => props.theme.secondary };
						border-radius: 4px;
						font-size: 1.3rem;
						font-weight: 500;
						height: 50px;
						width: 100%;
					}
				}

				& > *:nth-child(7) {
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

	@media (${ Themes.Device.Tablet }) {
		height: calc(100vh - 70px);
	}

	@media (${ Themes.Device.Laptop }) {
		${ Wrapper } {
			grid-template-columns: calc(1116px / 2) 1fr;
			grid-template-rows: 1fr;
			padding: 30px 50px;

			${ Section } {
				&:nth-child(1) {
					max-height: calc(100vh - 130px);
					position: sticky;
					top: 0;
				}

				&:nth-child(2) {
					
				}
			}
		}
	}
`

const ProductsDetails = () => {

	const router = useRouter()
	const { id } = router.query

	const [ showSuccess, setShowSuccess ] = useState(false)

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data, error } = useSWR(id ? `/api/products/${ id }` : null, fetcher, { refreshInterval: 1000 })

	const [ useSpinner, setUseSpinner ] = useState(false)

	if ( !data ) return 'loading...'

	const HANDLE_ADDCART = async (userID, productID, name, price, size, image) => {
		if ( session === null ) {
			router.push('/accounts')
			return
		}

		await axios.post('/api/carts/add', {
			userID, productID, name, price, size, image
		}).then(response => {
			setShowSuccess(true)
		}).catch(error => {
		})
	}

	return (
		<Container>
			{ useSpinner && <Spinner2 /> }
			{
				showSuccess && 
				<Message  onDoubleClick={ () => showSuccess && setShowSuccess(false) }>
					<span>Successfully added to cart.</span>
				</Message>
			}

			<Wrapper>
				<Section>
					<img src={ data.image } />
				</Section>

				<Section>
					<Items>
						<span>
							<h5>GALLON</h5>
						</span>
					</Items>

					<Items>
						<span>
							<h5>#{ data && data._id.slice(1, 6).toUpperCase() }</h5>
						</span>
					</Items>

					<Items>
						<span>{ data && data.name }</span>
					</Items>

					<Items>
						<span>₱{ data && data.price }</span>
					</Items>

					<Items>
						<span>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi corrupti voluptas porro libero illo ipsa ad eius. Aperiam nulla architecto tempore ab laboriosam cumque laudantium! Quos architecto similique, odit dolore?
							</p>
						</span>
					</Items>

					<Items>
						<Link href="/products">
							<button>
								BACK
							</button>
						</Link>
					</Items>

					<Items>
						<button onClick={ () => HANDLE_ADDCART(session && session.id, data._id, data.name, data.price, data.size, data.image) }>
							ADD TO CART
						</button>
					</Items>
				</Section>
			</Wrapper>
		</Container>
	)
}

export default ProductsDetails