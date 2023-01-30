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
      margin: 40px 0;
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
    font-weight: 700;
    display: block;
    position: relative;
    color: #757575;
    /* &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      background: linear-gradient(45deg, #bdbdbd, #f5f5f5, #fafafa);
      border-radius: 4px;
      left: 0;
      bottom: -8px;
    } */
  }
  hr {
    border: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(45deg, #bdbdbd, #f5f5f5);
    border-radius: 4px;
    margin: 8px 0 80px 0;
    &:last-of-type {
      background: linear-gradient(45deg, #f5f5f5, #bdbdbd);
      margin: 80px 0 40px 0;
    }
  }
  input[type='text'] {
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    padding: 4px;
    width: 480px;
    margin-right: 10px;
    font-size: 15px;
  }
  button {
    background: #eee;
    padding: 4px 16px;
    border-radius: 5px;
  }
`;

export default StyledKeepJournal;
