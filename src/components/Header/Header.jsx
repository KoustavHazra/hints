import React from 'react';
import { Container, Logo, LogoutButton } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ];

  return (
    <header className='py-3 shadow' style={{ background: "#212121" }}>
      <Container>
        <nav className='flex items-center justify-between'>
          <div>
            <Link to='/'>
              <Logo width='50px' />
            </Link>
          </div>
          <ul className='flex space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`nav-button px-4 py-2 duration-200 rounded-full ${
                      item.name === "Login" ? "hover:bg-blue-700" : 
                      item.name === "Signup" ? "hover:bg-blue-700" : "hover:bg-purple-400"
                    }`}
                    style={{ color: "white" }}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;
