import { css } from '@emotion/react';

const StyledKeepJournal = css`
  .container {
    width: 960px;
    margin: 0 auto;
    padding: 40px 0;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  h3 {
    font-size: 18px;
  }
  button {
    background: #eee;
    padding: 4px 16px;
  }
`;

export default StyledKeepJournal;
