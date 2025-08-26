import { Logo, LogoutBtn, Container } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];
  return (
    <header className="py-4 shadow-md bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-white font-bold text-xl tracking-wide">MegaBlog</span>
            </Link>
          </div>
          <ul className="flex items-center gap-2 md:gap-4">
            {navItems.map(
              (nav) =>
                nav.active && (
                  <li key={nav.name}>
                    <button
                      onClick={() => navigate(nav.slug)}
                      className="px-5 py-2 rounded-full bg-white text-blue-700 font-medium hover:bg-blue-100 transition-colors duration-200 shadow-sm"
                    >
                      {nav.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;