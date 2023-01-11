import { css } from '@emotion/react';

const StyledKeepJournal = css`
  .container {
    width: 960px;
    margin: 0 auto;
    padding: 40px 0;
    > div {
      display: flex;
      align-items: center;
      /* justify-content: space-between; */
      margin: 20px 0;
    }
  }
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  input[type='text'] {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 4px;
    width: 480px;
    margin-right: 10px;
  }
  button {
    background: #eee;
    padding: 4px 16px;
    border-radius: 5px;
  }
`;

export default StyledKeepJournal;
