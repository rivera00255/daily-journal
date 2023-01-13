import { css } from '@emotion/react';

const StyledKeepJournal = css`
  .container {
    width: 960px;
    margin: 0 auto;
    padding: 40px 0;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }
    .location {
      position: relative;
      > button {
        position: absolute;
        top: 4px;
        right: 14px;
        z-index: 1;
        font-size: 13px;
        background: #757575;
        color: #eee;
        padding: 4px 8px;
      }
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
