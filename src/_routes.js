import Home from './Home'
import About from './About'
import { injectGlobal } from 'styled-components'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:400,500,600');
  body {
    background: radial-gradient(855.46px at 48.78% 43.8%, #FFED4A 0%, #FFC700 100%);
    font-family: 'Work Sans', sans-serif;
    padding: 0;
    margin: 0;
  }
	.ais-InstantSearch__root { width: 100%; }

	* {   box-sizing: border-box; }

	a { text-decoration: none; }
`

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    exact: true,
    component: About
  }
]
