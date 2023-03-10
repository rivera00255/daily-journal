import { css } from '@emotion/react';

const StyledMain = css`
  .container {
    width: 960px;
    margin: 0 auto;
    padding: 40px 0;
    min-height: 50vh;
    h3 {
      font-size: 18px;
      font-weight: 700;
      display: block;
      position: relative;
      color: #757575;
    }
    hr {
      border: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(45deg, #bdbdbd, #f5f5f5);
      border-radius: 4px;
      margin: 8px 0 40px 0;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-wrap: wrap;
      > a {
        /* border: 2px solid #757575;
        border-radius: 5px;
        max-width: 45%;
        min-height: 120px;
        padding: 20px 40px;
        margin: 16px 8px;
        position: relative; */
      }
    }
  }
`;

export default StyledMain;
