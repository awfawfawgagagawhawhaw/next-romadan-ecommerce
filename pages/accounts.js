import { Themes, LogoIcon, UserIcon, GoogleIcon, LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, SpinnerIcon, Spin } from 'iconeecs'
import { useState, useEffect, useContext, useRef } from 'react'
import { Iconeecs } from 'sources/stores'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import emailjs from 'emailjs-com'
import Cookies from 'js-cookie'
import Link from 'next/link'
import axios from 'axios'

const Spinner = styled.div`
	backdrop-filter: blur(1px);
	place-items: center;
	position: absolute;
	display: grid;
	height: 100%;
	width: 100%;
	z-index: 9;

	svg {
		animation: ${ Spin } 1.5s infinite;
		color: ${ Themes.Colors.Primary };
		height: 50px;
		width: 50px;
	}
`

const Icons = styled.div`
	place-items: center;
	position: absolute;
	display: grid;
	height: 50px;
	width: 50px;

	svg {
		height: 24px;
		width: 24px;
	}

	&:nth-child(2) {
		cursor: pointer;
		right: 0;
	}
`

const Input = styled.input`
	padding: ${ props => props.padding };
	background-color: transparent;
	border: none;
	height: 50px;
	width: 100%;

	&[type=button], &[type=submit] {
		border-radius: 4px;
		font-size: 1.3rem;
		font-weight: 500;
		padding: 0;
	}

	&[type=button] {
		background-color: ${ props => props.theme.secondary };
	}

	&[type=submit] {
		background-color: ${ Themes.Colors.Primary };
		color: hsl(0, 0%, 100%);
	}

	&::placeholder {
		color: hsl(230, 100%, 85%);
	}
`

const Items = styled.div`
	grid-column: ${ props => props.max && '1 / span 2' };
	outline: 1px solid ${ props => props.theme.outline };
	border-radius: 4px;
	position: relative;
`

const MessageArea = styled.div`
	background-color: ${ Themes.Colors.Danger };
	grid-column: 1 / span 2;
	color: hsl(0, 0%, 100%);
	align-items: center;
	border-radius: 5px;
	position: relative;
	display: grid;
	height: 50px;

	p {
		padding-left: 50px;
		font-size: 1.3rem;
		font-weight: 500;
	}
`

const TextArea = styled.div`
	grid-column: 1 / span 2;
	text-align: center;
	display: grid;
	gap: 15px;

	h1 {
		font-size: 2.0rem;
		font-weight: 800;
	}

	p {
		font-size: 1.3rem;

		span {
			color: ${ Themes.Colors.Primary };
			font-weight: 500;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`

const Form = styled.form`
	outline: 1px solid ${ props => props.theme.outline };
	box-shadow: ${ props => props.theme.shadow };
	grid-template-columns: 1fr 1fr;
	border-radius: 5px;
	overflow-y: scroll;
	position: relative;
	max-height: 100%;
	max-width: 400px;
	padding: 30px;
	display: grid;
	height: auto;
	width: 100%;
	gap: 30px;
`

const Frame = styled.div`
	background-color: ${ props => props.theme.secondary };
	place-items: center;
	border-radius: 5px;
	display: grid;
	height: 100%;
	width: 100%;

	svg {
		height: 100px;
		width: 100px;
	}
`

const Section = styled.div`
	justify-content: center;
	align-items: center;
	display: flex;
	height: 100%;
	width: 100%;
`

const Wrapper = styled.div`
	max-width: 1366px;
	display: flex;
	width: 100%;
`

const Container = styled.div`
	justify-content: center;
	display: flex;
	height: 100vh;
	width: 100%;

	${ Wrapper } {
		padding: 30px;
		gap: 30px;

		${ Section } {
			&:nth-child(1) {
				display: none;
			}
		}
	}

	@media (${ Themes.Device.Laptop }) {
		${ Wrapper } {
			padding: 50px;
			gap: 50px;

			${ Section } {
				width: 50%;

				&:nth-child(1) {
					display: flex;
				}
			}
		}
	}
`

const Accounts = () => {

	const router = useRouter()

	const { state, dispatch } = useContext(Iconeecs)
	const { pending, session } = state

	if ( session ) {
		router.push('/')
		return null
	}

	const [ userData, setUserData ] = useState({ firstname: '', lastname: '', email: '', password: '', codes: '' })
	const { firstname, lastname, email, password, codes } = userData
	const [ useCodes, setUseCodes ] = useState('')

	const inputFirstname = useRef(null)
	const inputLastname = useRef(null)
	const inputEmail = useRef(null)
	const inputPassword = useRef(null)
	const inputCodes = useRef(null)

	const [ useSignIn, setUseSignIn ] = useState(true)
	const [ useSignUp, setUseSignUp ] = useState(false)
	const [ useVerify, setUseVerify ] = useState(false)
	const [ use2Steps, setUse2Steps ] = useState(false)

	const [ useResetStep1, setUseResetStep1 ] = useState(false)
	const [ useResetStep2, setUseResetStep2 ] = useState(false)
	const [ useResetStep3, setUseResetStep3 ] = useState(false)

	const [ showPassword, setShowPassword ] = useState(false)
	const [ target, setTarget ] = useState(false)
	const [ message, setMessage ] = useState('')
	const [ show, setShow ] = useState(false)
	const [ counter, setCounter ] = useState(0)
	const [ resend, setResend ] = useState(false)
	const [ useSpinner, setUseSpinner ] = useState(false)

	const HANDLE_SPINNER = () => {
		return (
			<Spinner>
				<SpinnerIcon />
			</Spinner>
		)
	}

	const HANDLE_INPUTS = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
		setShow(false)
	}

	const HANDLE_FOCUS = (e) => {
		setTarget(e.target.name)

		if ( target !== e.target.name ) {
			setShow(false)
		}
	}

	const HANDLE_ERRORS = () => {
		return (
			<MessageArea>
				<Icons>
					<AlertCircleIcon stroke="#FFFFFF" />
				</Icons>

				<p>{ message }</p>
			</MessageArea>
		)
	}

	const HANDLE_CODES = (email) => {
		setCounter(30)
		setResend(false)
		const generateCodes = Math.floor(10000 + Math.random() * 90000)

		const template = {
			email: pending && pending.email || email,
			code: generateCodes
		}

		setUseCodes(generateCodes)
		emailjs.send('service_6qlnoiv', 'template_wnywugm', template, 'user_SWAtem865rbS9e8XZtGxk')
	}

	const HANDLE_SIGNIN = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( email ) {
			const check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( !check.test(email) ) {
				setUseSpinner(false)
				inputEmail.current.focus()
				setShow(true), setTarget('email'), setMessage('Email address is invalid.')
				return
			}
		} else {
			setUseSpinner(false)
			inputEmail.current.focus()
			setShow(true), setTarget('email'), setMessage('Email address is required.')
			return
		}

		if ( !password ) {
			setUseSpinner(false)
			inputPassword.current.focus()
			setShow(true), setTarget('password'), setMessage('Password is required.')
			return
		}

		await axios.post('/api/accounts/twosteps', {
			email, password
		}).then((response) => {
			setUseSpinner(false)
			
			if ( response.data.verify ) {
				setUseSpinner(false)
				dispatch({ type: 'PENDING', payload: { email: email.toLowerCase() } })
				HANDLE_CODES(email)
				setUseSignIn(false), setUse2Steps(true)
				return
			}

			setUseSpinner(false)
			const clone_data = JSON.stringify(response.data)

			Cookies.set('SESSION', clone_data)
			dispatch({ type: 'LOADERS', payload: true })
			dispatch({ type: 'PENDING', payload: null })
			dispatch({ type: 'SESSION', payload: response.data })
		}).catch((error) => {
			if ( error.response && error.response.data.emailError ) {
				setUseSpinner(false)
				inputEmail.current.focus()
				setShow(true), setTarget('email'), setMessage(error.response.data.emailError)
				return
			}

			if ( error.response && error.response.data.passwordError ) {
				setUseSpinner(false)
				inputPassword.current.focus()
				setShow(true), setTarget('password'), setMessage(error.response.data.passwordError)
				return
			}
		})
	}

	const HANDLE_SIGNUP = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( firstname ) {
			if ( firstname.length < 3 ) {
				setUseSpinner(false)
				inputFirstname.current.focus()
				setShow(true), setTarget('firstname'), setMessage('Firstname atleast 3 characters.')
				return
			}

			if ( firstname.length > 20 ) {
				setUseSpinner(false)
				inputFirstname.current.focus()
				setShow(true), setTarget('firstname'), setMessage('You reached the maximum of 20 characters.')
				return
			}
		} else {
			setUseSpinner(false)
			inputFirstname.current.focus()
			setShow(true), setTarget('firstname'), setMessage('Firstname is required.')
			return
		}

		if ( lastname ) {
			if ( lastname.length < 3 ) {
				setUseSpinner(false)
				inputLastname.current.focus()
				setShow(true), setTarget('lastname'), setMessage('Lastname atleast 3 characters.')
				return
			}

			if ( lastname.length > 20 ) {
				setUseSpinner(false)
				inputLastname.current.focus()
				setShow(true), setTarget('lastname'), setMessage('You reached the maximum of 20 characters.')
				return
			}
		} else {
			setUseSpinner(false)
			inputLastname.current.focus()
			setShow(true), setTarget('lastname'), setMessage('Lastname is required.')
			return
		}

		if ( email ) {
			const check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			
			if ( !check.test(email) ) {
				setUseSpinner(false)
				inputEmail.current.focus()
				setShow(true), setTarget('email'), setMessage('Email address is invalid.')
				return
			}
		} else {
			setUseSpinner(false)
			inputEmail.current.focus()
			setShow(true), setTarget('email'), setMessage('Email address is required.')
			return
		}

		if ( password ) {
			if ( password.length < 8 ) {
				setUseSpinner(false)
				inputPassword.current.focus()
				setShow(true), setTarget('password'), setMessage('Password atleast 8 characters.')
				return
			}
		} else {
			setUseSpinner(false)
			inputPassword.current.focus()
			setShow(true), setTarget('password'), setMessage('Password is required.')
			return
		}
		
		await axios.post('/api/accounts/email', {
			email
		}).then((response) => {
			setUseSpinner(false)
			dispatch({ type: 'PENDING', payload: { firstname: firstname.toLowerCase(), lastname: lastname.toLowerCase(), email: email.toLowerCase(), password: password } })
			HANDLE_CODES(email)
			setUseSignIn(false), setUseSignUp(false), setUseVerify(true)
		}).catch((error) => {
			if ( error.response ) {
				setUseSpinner(false)
				inputEmail.current.focus()
				setShow(true), setTarget('email'), setMessage(error.response.data.message)
				return
			}
		})
	}

	const HANDLE_VERIFY = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( codes ) {
			if( Number(codes) !== useCodes ) {
				setUseSpinner(false)
				inputCodes.current.focus()
				setShow(true), setTarget('codes'), setMessage('Invalid verification code!')
				return
			}
		} else {
			setUseSpinner(false)
			inputCodes.current.focus()
			setShow(true), setTarget('codes'), setMessage('Verification code is required.')
			return
		}

		await axios.post('/api/accounts/signup', {
			firstname: pending.firstname, lastname: pending.lastname, email: pending.email, password: pending.password
		}).then((response) => {
			setUseSpinner(false)
			const clone_data = JSON.stringify(response.data)

			Cookies.set('SESSION', clone_data)
			dispatch({ type: 'LOADERS', payload: true })
			dispatch({ type: 'PENDING', payload: null })
			dispatch({ type: 'SESSION', payload: response.data })
		}).catch((error) => {
			console.log(error)
		})
	}

	const HANDLE_2STEPS = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( codes ) {
			if( Number(codes) !== useCodes ) {
				setUseSpinner(false)
				inputCodes.current.focus()
				setShow(true), setTarget('codes'), setMessage('Invalid verification code!')
				return
			}
		} else {
			setUseSpinner(false)
			inputCodes.current.focus()
			setShow(true), setTarget('codes'), setMessage('Verification code is required.')
			return
		}

		await axios.post('/api/accounts/signin', {
			email: pending.email
		}).then((response) => {
			setUseSpinner(false)
			const clone_data = JSON.stringify(response.data)

			Cookies.set('SESSION', clone_data)
			dispatch({ type: 'LOADERS', payload: true })
			dispatch({ type: 'PENDING', payload: null })
			dispatch({ type: 'SESSION', payload: response.data })
		}).catch((error) => {
			console.log(error)
		})
	}

	const HANDLE_RESETS1 = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( !email ) {
			setUseSpinner(false)
			inputEmail.current.focus()
			setShow(true), setTarget('email'), setMessage('Email address is required.')
			return
		}

		await axios.post('/api/accounts/check', {
			email
		}).then((response) => {
			setUseSpinner(false)
			dispatch({ type: 'PENDING', payload: { email: email.toLowerCase() } })
			HANDLE_CODES(email)
			setUseResetStep1(false), setUseResetStep2(true)
		}).catch((error) => {
			if ( error.response ) {
				setUseSpinner(false)
				inputEmail.current.focus()
				setShow(true), setTarget('email'), setMessage(error.response.data.message)
				return
			}
		})
	}

	const HANDLE_RESETS2 = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( codes ) {
			if( Number(codes) !== useCodes ) {
				setUseSpinner(false)
				inputCodes.current.focus()
				setShow(true), setTarget('codes'), setMessage('Invalid verification code!')
				return
			}
		} else {
			setUseSpinner(false)
			inputCodes.current.focus()
			setShow(true), setTarget('codes'), setMessage('Verification code is required.')
			return
		}

		setUseSpinner(false), setUseResetStep2(false), setUseResetStep3(true)
	}

	const HANDLE_RESETS3 = async (e) => {
		e.preventDefault()

		setUseSpinner(true)

		if ( password ) {
			if ( password.length < 8 ) {
				setUseSpinner(false)
				inputPassword.current.focus()
				setShow(true), setTarget('password'), setMessage('Password atleast 8 characters.')
				return
			}
		} else {
			setUseSpinner(false)
			inputPassword.current.focus()
			setShow(true), setTarget('password'), setMessage('Password is required.')
			return
		}

		await axios.post('/api/accounts/resets', {
			email: pending.email, password
		}).then((response) => {
			setUseSpinner(false)
			setUseResetStep3(false), setUseSignIn(true)
		}).catch((error) => {
			setUseSpinner(false)
		})
	}

	useEffect(() => {
		setUserData({ firstname: '', lastname: '', email: '', password: '' })
		setShowPassword(false)
		setShow(false)
	}, [ useSignIn, useSignUp ])

	useEffect(() => {
		const timer = setTimeout(() => {
			if ( counter !== 0 ) {
				setCounter(counter - 1)
			} else {
				setResend(true)
			}
		}, 1000)

		return () => {
			clearTimeout(timer)
		}
	}, [counter])

	return (
		<Container>
			<Wrapper>
				<Section>
					<Frame>
						<LogoIcon />
					</Frame>
				</Section>

				<Section>
					{
						useSignIn && 
						<Form onSubmit={ HANDLE_SIGNIN }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>WELCOME TO ROMADAN</h1>
								<p>New here? <span onClick={ () => useSignIn ? setUseSignIn(false) || setUseSignUp(true) : setUseSignIn(true) }>Create account</span></p>
							</TextArea>

							<Items max="true">
								<Icons>
									<GoogleIcon />
								</Icons>

								<Input padding="0 15px 0 50px" type="text" placeholder="Email Adress" name="email" ref={ inputEmail }  onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'email' && show && HANDLE_ERRORS() }

							<Items max="true">
								<Icons>
									<LockIcon stroke="hsl(230, 100%, 85%)" />
								</Icons>

								<Icons onClick={ () => showPassword ? setShowPassword(false) : setShowPassword(true) }>
									{ showPassword ? <EyeIcon stroke="hsl(230, 100%, 85%)" /> : <EyeOffIcon stroke="hsl(230, 100%, 85%)" /> }
								</Icons>

								<Input padding="0 50px" type={`${ showPassword ? 'text' : 'password' }`} placeholder="Password" name="password" ref={  inputPassword } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'password' && show && HANDLE_ERRORS() }

							<Link href="/">
								<Input type="button" value="Back" />
							</Link>

							<Input type="submit" value="Continue" />

							<TextArea>
								<p onClick={ () => setUseSignIn(false) || setUseResetStep1(true) }><span>Forgot Password?</span></p>
							</TextArea>
						</Form>
					}

					{
						useSignUp && 
						<Form onSubmit={ HANDLE_SIGNUP }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>CREATE ACCOUNT</h1>
								<p>Already have an account? <span onClick={ () => useSignUp ? setUseSignUp(false) || setUseSignIn(true) : setUseSignUp(true) }>Sign In here</span></p>
							</TextArea>

							<Items>
								<Input padding="0 15px" type="text" placeholder="Firstname" name="firstname" ref={ inputFirstname } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							<Items>
								<Input padding="0 15px" type="text" placeholder="Lastname" name="lastname" ref={ inputLastname } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'firstname' && show && HANDLE_ERRORS() }
							{ target === 'lastname' && show && HANDLE_ERRORS() }

							<Items max="true">
								<Icons>
									<GoogleIcon />
								</Icons>

								<Input padding="0 15px 0 50px" type="text" placeholder="Email Adress" name="email" ref={ inputEmail } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'email' && show && HANDLE_ERRORS() }

							<Items max="true">
								<Icons>
									<LockIcon stroke="hsl(230, 100%, 85%)" />
								</Icons>

								<Icons onClick={ () => showPassword ? setShowPassword(false) : setShowPassword(true) }>
									{ showPassword ? <EyeIcon stroke="hsl(230, 100%, 85%)" /> : <EyeOffIcon stroke="hsl(230, 100%, 85%)" /> }
								</Icons>

								<Input padding="0 50px" type={`${ showPassword ? 'text' : 'password' }`} placeholder="Password" name="password" ref={ inputPassword } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'password' && show && HANDLE_ERRORS() }

							<Input type="button" value="Back" onClick={ () => useSignUp ? setUseSignUp(false) || setUseSignIn(true) : setUseSignUp(true) } />
							<Input type="submit" value="Create account" />

							<TextArea>
								<p>By clicking Create account, you agree to our <span>Terms</span>, <span>Data Policy</span> and <span>Cookies Policy</span>.</p>
							</TextArea>
						</Form>
					}

					{
						useVerify && 
						<Form onSubmit={ HANDLE_VERIFY }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>VERIFY ACCOUNT</h1>
								<p>Please enter the verification code we sent to your email address <span style={{ cursor: 'default', textDecoration: 'none' }}>{ pending && pending.email }</span></p>
							</TextArea>

							<Items max="true">
								<Input style={{ textAlign: 'center' }} padding="0 15px" type="text" inputMode="numeric" maxLength="5" placeholder="Verification code" name="codes" ref={ inputCodes } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'codes' && show && HANDLE_ERRORS() }

							<Input style={{ cursor: `${ resend ? 'pointer' : 'not-allowed' }` }} type="button" value={ counter !== 0 ? 'Re-Send in ' + counter + 's' : 'Re-Send' } onClick={  HANDLE_CODES } disabled={ !resend && 'disabled' } />
							<Input type="submit" value="Verify" />
						</Form>
					}

					{
						use2Steps && 
						<Form onSubmit={ HANDLE_2STEPS }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>2-STEPS VERIFICATION</h1>
								<p>Please enter the verification code we sent to your email address <span style={{ cursor: 'default', textDecoration: 'none' }}>{ pending && pending.email }</span></p>
							</TextArea>

							<Items max="true">
								<Input style={{ textAlign: 'center' }} padding="0 15px" type="text" inputMode="numeric" maxLength="5" placeholder="Verification code" name="codes" ref={ inputCodes } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'codes' && show && HANDLE_ERRORS() }

							<Input style={{ cursor: `${ resend ? 'pointer' : 'not-allowed' }` }} type="button" value={ counter !== 0 ? 'Re-Send in ' + counter + 's' : 'Re-Send' } onClick={  HANDLE_CODES } disabled={ !resend && 'disabled' } />
							<Input type="submit" value="Verify" />
						</Form>
					}

					{
						useResetStep1 && 
						<Form onSubmit={ HANDLE_RESETS1 }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>RESET PASSWORD</h1>
								<p>Find your Romadan Account</p>
							</TextArea>

							<Items max="true">
								<Icons>
									<GoogleIcon />
								</Icons>

								<Input padding="0 15px 0 50px" type="text" placeholder="Email Adress" name="email" ref={ inputEmail } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'email' && show && HANDLE_ERRORS() }

							<Input type="button" value="Back" onClick={ () => setUseSignIn(true) || setUseResetStep1(false) } />
							<Input type="submit" value="Continue" />
						</Form>
					}

					{
						useResetStep2 && 
						<Form onSubmit={ HANDLE_RESETS2 }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>RESET PASSWORD</h1>
								<p>Please enter the verification code we sent to your email address <span style={{ cursor: 'default', textDecoration: 'none' }}>{ pending && pending.email }</span></p>
							</TextArea>

							<Items max="true">
								<Input style={{ textAlign: 'center' }} padding="0 15px" type="text" inputMode="numeric" maxLength="5" placeholder="Verification code" name="codes" ref={ inputCodes } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'codes' && show && HANDLE_ERRORS() }

							<Input style={{ cursor: `${ resend ? 'pointer' : 'not-allowed' }` }} type="button" value={ counter !== 0 ? 'Re-Send in ' + counter + 's' : 'Re-Send' } onClick={  HANDLE_CODES } disabled={ !resend && 'disabled' } />
							<Input type="submit" value="Verify" />
						</Form>
					}

					{
						useResetStep3 && 
						<Form onSubmit={ HANDLE_RESETS3 }>
							{ useSpinner && HANDLE_SPINNER() }

							<TextArea>
								<h1>RESET PASSWORD</h1>
								<p>Please enter your new password for <span style={{ cursor: 'default', textDecoration: 'none' }}>{ pending && pending.email }</span></p>
							</TextArea>

							<Items max="true">
								<Icons>
									<LockIcon stroke="hsl(230, 100%, 85%)" />
								</Icons>

								<Icons onClick={ () => showPassword ? setShowPassword(false) : setShowPassword(true) }>
									{ showPassword ? <EyeIcon stroke="hsl(230, 100%, 85%)" /> : <EyeOffIcon stroke="hsl(230, 100%, 85%)" /> }
								</Icons>

								<Input padding="0 50px" type={`${ showPassword ? 'text' : 'password' }`} placeholder="New Password" name="password" ref={  inputPassword } onFocus={ HANDLE_FOCUS } onChange={ HANDLE_INPUTS } />
							</Items>

							{ target === 'password' && show && HANDLE_ERRORS() }

							<Input style={{ gridColumn: '2' }} type="submit" value="Verify" />
						</Form>
					}
				</Section>
			</Wrapper>
		</Container>
	)
}

export default Accounts
