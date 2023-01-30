import { css } from '@emotion/react';

const Footer = () => {
  return <footer css={StyledFooter}>Copyright ⓒ 2023 rivera00255@gmail.com. All rights reserved.</footer>;
};

export default Footer;

const StyledFooter = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 200;
  padding: 20px 0;
`;
