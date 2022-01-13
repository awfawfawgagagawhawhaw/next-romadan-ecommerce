import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	*, *::before, *::after {
		letter-spacing: 0.03rem;
		box-sizing: border-box;
		outline: 0;
		padding: 0;
		margin: 0;
	}

	::-webkit-scrollbar {
		width: 0;
	}

	html {
		font-size: 62.5%;
	}

	body {
		background-color: ${ props => props.theme.background };
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		color: ${ props => props.theme.text };
		font-family: 'Inter', sans-serif;
		font-size: 1.6rem;
		line-height: 1.5;
	}

	button, input {
		font-family: inherit;
		color: inherit;
	}

	button, input[type=button], input[type=submit] {
		cursor: pointer;
		border: none;
	}

	input::-ms-reveal, input::-ms-clear {
		display: none;
	}

	[disabled] {
		cursor: not-allowed;
	}
`