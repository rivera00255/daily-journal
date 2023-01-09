import StyledHeader from './StyledHeader';

const Header = () => {
  return (
    <header css={StyledHeader}>
      <nav>
        <h1>Daily Journal</h1>
        <ul>
          <li>나의일기</li>
          <li>기록하기</li>
        </ul>
        <div>로그인/회원가입</div>
      </nav>
    </header>
  );
};

export default Header;