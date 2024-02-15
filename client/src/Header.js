import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext)
  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })

  }, [])

  const logout = async () => {
    const res = await fetch('http://localhost:4000/logout', {
      method: "POST",
      credentials: 'include'
    })
    const response = await res.json();
    setRedirect(true);
    
  }

  if (redirect) {
    return <Navigate to={'/'}/>
  }




  const username = userInfo?.username;

  return (
    <header>
      <div className='myapp'>
        <Link to="/" className="logo">MyBlog</Link>
      </div>
      <nav>
        {username && (
          <>
            <span>Hello, {username}</span>
            <Link className="cnp" to="/create"> Create New Post </Link>
            <div className="logout" onClick={logout}>Logout</div>
          </>
        )}
        {!username && (
          <>
            <div className='random'>
              <div id='login'>
                <Link to="/login">Login</Link>
              </div>
              <div id='register'>
                <Link to="/register">Register</Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
export default Header;