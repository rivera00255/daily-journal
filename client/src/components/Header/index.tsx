import { useState } from 'react';
import { Link, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../../recoils/auth';
import LoginModal from '../LoginModal';
import StyledHeader from './StyledHeader';

const Header = () => {
  const [popup, setPopup] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  // console.log(auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header css={StyledHeader}>
      {popup && <LoginModal popup={popup} setPopup={setPopup} />}
      <nav>
        <h1>
          <Link to="/">Daily Journal</Link>
        </h1>
        <ul>
          <li>
            <Link to="/" className={pathname === '/' ? 'current' : ''}>
              나의일기
            </Link>
          </li>
          <li>
            <Link to="/keep" className={pathname === '/keep' ? 'current' : ''}>
              기록하기
            </Link>
          </li>
        </ul>
        {auth === null ? (
          <button onClick={() => setPopup(true)}>로그인</button>
        ) : (
          <button
            onClick={() => {
              setAuth(null);
              navigate('/');
            }}>
            로그아웃
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
