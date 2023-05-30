import logo from '../../assets/placeholders/Logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAdmin } from '../../store/features/auth/authSlice'
// import Admin from '../../pages/admin/Admin';

const Header = () => {
  const { admin } = useSelector((state) => ({
    admin: state.auth.admin,
  }))

  const dispatch = useDispatch()

  return (
    <header>
      <nav className="nav_container">
        <div className="logo_div">
          <Link to="/admin-panel">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="nav_links_div">
          <ul>
            {admin ? (
              <>
                <li>
                  <NavLink to="/admin-panel">Admin Panel</NavLink>
                </li>
                <li>
                  <NavLink to="/addProduct">Add Products</NavLink>
                </li>
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
                  <Link onClick={() => dispatch(logoutAdmin())}>
                    Logout
                  </Link>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login-admin">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register-admin">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
};

export default Header;
