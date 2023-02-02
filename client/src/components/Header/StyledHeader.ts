import { css } from '@emotion/react';

const StyledHeader = css`
  width: 100%;
  > nav {
    width: 960px;
    margin: 0 auto;
    position: relative;
    > h1 {
      text-align: center;
      margin: 10px 0 20px 0;
      font-size: 20px;
      font-weight: 800;
    }
    > ul {
      display: flex;
      align-items: center;
      justify-content: center;
      > li {
        margin: 0 10px;
      }
    }
    > button {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 13px;
      color: #757575;
    }
  }
`;

export default StyledHeader;
