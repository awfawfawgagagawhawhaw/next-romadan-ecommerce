import { useState, useEffect, useContext } from 'react'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Themes } from 'iconeecs'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'

const Content = styled.div`
	grid-template-rows: 50px 1fr;
	display: grid;
	height: 100%;
	gap: 30px;

	& > div {
		&:nth-child(1) {
			justify-content: space-between;
			align-items: center;
			display: flex;

			& > span {
				font-size: 1.5rem;
				font-weight: 500;
			}

			& > button {
				background-color: ${ Themes.Colors.Primary };
				color: hsl(0, 0%, 100%);
				border-radius: 5px;
				font-size: 1.2rem;
				font-weight: 500;
				padding: 0 20px;
				height: 100%;
			}
		}

		&:nth-child(2) {
			border-bottom: 1px solid ${ props => props.theme.outline };
			border-top: 1px solid ${ props => props.theme.outline };
			grid-template-columns: 1fr 1fr;
			overflow-y: scroll;
			padding: 30px 0;
			display: grid;
			gap: 30px;

			& > div {
				grid-template-columns: 150px 1fr auto;
				grid-template-rows: auto 1fr auto;
				display: grid;
				height: 150px;
				gap: 15px;

				& > *:nth-child(1) {
					background-color: ${ props => props.theme.secondary };
					place-items: center;
					grid-row: 1 / span 3;
					border-radius: 5px;
					padding: 0 15px;
					display: grid;

					& > img {
						object-fit: cover;
						height: 100px;
						width: 100px;
					}
				}

				& > *:nth-child(2) {
					grid-row: 1 / span 3;
					grid-column: 2;
					display: grid;

					& > span {
						font-size: 1.3rem;
					}
				}

				& > *:nth-child(3) {
					text-align: right;

					& > span {
						font-size: 1.2rem;
						font-weight: 600;
					}
				}

				& > *:nth-child(4) {
					border: 1px solid ${ props => props.theme.outline };
					border-radius: 4px;
					grid-column: 3;
					grid-row: 3;

					& > button {
						background-color: ${ props => props.theme.secondary };
						font-size: 1.15rem;
						font-weight: 500;
						transition: .3s;
						padding: 0 15px;
						height: 30px;

						&:hover {
							background-color: ${ Themes.Colors.Primary };
							color: hsl(0, 0%, 100%);
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

const Products = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { session } = state

	if ( session && !session.isAdmin ) {
		router.push('/')
		return null
	}

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data: products, error:products_error } = useSWR('/api/products', fetcher, { refreshInterval: 1000 })

	return (
		<Container>
			<Wrapper>
				<Content>
					<div>
						<span>PRODUCT LIST</span>
						
						<Link href="/admin/products/add">
							<button>NEW PRODUCTS</button>
						</Link>
					</div>

					<div>
						{
							products && products.map(product => (
								<div key={ product._id }>
									<span>
										<img src={ product.image } />
									</span>

									<div>
										<span>{ product.name }</span>
										<span>{ product.price }</span>
										<span>{ product.size }</span>
										<span>{ product.stock }</span>
										<span>{ product.sold }</span>
									</div>

									<span>#{ product._id.slice(1, 6).toUpperCase() }</span>

									<span>
										<button>EDIT</button>
										<button>DELETE</button>
									</span>
								</div>
							))
						}
					</div>
				</Content>
			</Wrapper>
		</Container>
	)
}

export default Products