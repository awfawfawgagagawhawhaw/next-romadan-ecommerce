import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Themes } from 'iconeecs'
import Link from 'next/link'

const Icons = styled.span`
	
`

const Button = styled.button`
	background-color: transparent;
	align-items: center;
	font-size: 1.3rem;
	padding: 0 15px;
	display: flex;
	height: 50px;
	width: 100%;
	gap: 15px;
`

const Items = styled.div`
	
`

const Container = styled.div`
	background-color: ${ props => props.theme.background };
	max-height: calc(100vh - 70px);
	position: sticky;
	display: grid;
	padding: 30px;
	gap: 30px;
	top: 0;
`

export const Sidebar = () => {

	const router = useRouter()

	return (
		<Container>
			<Items>
				<Link href="/admin">
					<Button>
						<Icons>
								
						</Icons>

						Dashboard
					</Button>
				</Link>

				<Link href="/admin/orders">
					<Button>
						<Icons>
								
						</Icons>

						Orders
					</Button>
				</Link>

				<Link href="/admin/products">
					<Button>
						<Icons>
								
						</Icons>

						Products
					</Button>
				</Link>
			</Items>
		</Container>
	)
}