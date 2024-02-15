import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<main id="main">
			<Header />
			<Outlet />
		</main>
	)
}

export default Layout