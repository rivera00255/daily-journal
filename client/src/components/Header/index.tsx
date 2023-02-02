import { Link } from 'react-router-dom';
import StyledHeader from './StyledHeader';

const Header = () => {
  return (
    <header css={StyledHeader}>
      <nav>
        <h1>
          <Link to="/">Daily Journal</Link>
        </h1>
        <ul>
          <li>
            <Link to="/">나의일기</Link>
          </li>
          <li>
            <Link to="/keep">기록하기</Link>
          </li>
        </ul>
        <button>로그인</button>
      </nav>
    </header>
  );
};

export default Header;
