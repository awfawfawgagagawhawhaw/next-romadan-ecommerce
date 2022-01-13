import styled from 'styled-components'
import { Themes } from 'iconeecs'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios'

const Items = styled.div`
	outline: 1px solid ${ props => props.theme.outline };
	box-shadow: ${ props => props.theme.shadow };
	grid-template-rows: 1fr auto;
	border-radius: 5px;
	cursor: pointer;
	display: grid;
	height: 250px;

	& > div {
		&:nth-child(1) {
			place-items: center;
			position: relative;
			display: grid;

			& > img {
				transition: .3s;
				width: 135px;
			}

			& > span {
				background-color: ${ props => props.theme.secondary };
				position: absolute;
				border-radius: 50%;
				display: flex;
				height: 100px;
				width: 100px;
				z-index: -1;
			}
		}

		&:nth-child(2) {
			grid-template-columns: 1fr;
			padding-bottom: 30px;
			align-items: center;
			text-align: center;
			display: grid;
			gap: 5px;

			& > span {
				&:nth-child(1) {
					font-size: 1.1rem;
					font-weight: 500;
				}

				&:nth-child(2) {
					color: ${ Themes.Colors.Primary };
					font-size: 1.5rem;
					font-weight: 800;
				}
			}
		}
	}

	&:hover {
		& > div {
			&:nth-child(1) {
				& > img {
					transform: scale(1.2);
				}
			}
		}
	}
`

const Section = styled.div`
	
`

const Wrapper = styled.div`
	padding-bottom: 100px;
	padding-top: 30px;
	max-width: 1366px;
	display: grid;
	width: 100%;
`

const Container = styled.div`
	min-height: calc(100vh - 140px);
	justify-content: center;
	padding: 0 30px;
	display: flex;

	${ Wrapper } {
		grid-template-rows: 50px 1fr;
		grid-template-columns: 1fr;
		gap: 30px;

		${ Section } {
			&:nth-child(1) {
				border-bottom: 1px solid ${ props => props.theme.outline };
				max-height: calc(100vh - 70px);
			}

			&:nth-child(2) {
				grid-template-columns: 1fr 1fr;
				display: grid;
				gap: 30px;
			}
		}
	}

	@media (${ Themes.Device.Tablet }) {
		min-height: calc(100vh - 70px);

		${ Wrapper } {
			padding-bottom: 0;
			padding: 30px 0;

			${ Section } {
				&:nth-child(1) {
					max-height: calc(100vh - 130px);
					top: 100px;
				}

				&:nth-child(2) {
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
				}
			}
		}
	}

	@media (${ Themes.Device.Laptop }) {
		padding: 0 50px;

		${ Wrapper } {
			grid-template-columns: 250px 1fr;
			grid-template-rows: 1fr;

			${ Section } {
				&:nth-child(1) {
					border-right: 1px solid ${ props => props.theme.outline };
					border-bottom: none;
					position: sticky;
				}

				&:nth-child(2) {
				}
			}
		}
	}
`

const  Products = () => {

	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data, error } = useSWR('/api/products', fetcher, { refreshInterval: 1000 })
	
	if ( !data ) return (
		<Container>
			<Wrapper>
				<Section>
					
				</Section>

				<Section>
					<Items></Items><Items></Items>
					<Items></Items><Items></Items>
					<Items></Items><Items></Items>
					<Items></Items><Items></Items>
				</Section>
			</Wrapper>
		</Container>
	)

	return (
		<Container>
			<Wrapper>
				<Section>
					
				</Section>

				<Section>
					{
						data && data.map(data => (
							<Link href={`/products/${ data._id }`} key={ data._id }>
								<Items>
									<div>
										<img src={ data.image } />
										<span></span>
									</div>

									<div>
										<span>{ data.name }</span>
										<span>₱{ data.price }</span>
									</div>
								</Items>
							</Link>
						))
					}
				</Section>
			</Wrapper>
		</Container>
	)
}

export default Products