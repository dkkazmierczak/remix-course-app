import { Link } from '@remix-run/react';
import Logo from '../util/Logo';

function MainHeader() {
  return (
    <header id='main-header'>
      <Logo />
      <nav id='main-nav'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/pricing'>Pricing</Link>
          </li>
          <li>
            <Link to='/expenses'>Expenses</Link>
          </li>
        </ul>
      </nav>
      <nav id='cta-nav'>
        <ul>
          <li>
            <Link to='/auth' className='cta'>
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
