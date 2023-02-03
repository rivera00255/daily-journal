import { css } from '@emotion/react';

const StyledLoginModal = css`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(117, 117, 117, 0.2);
  .container {
    width: 500px;
    height: 360px;
    padding: 50px 40px;
    background: #fff;
    border-radius: 5px;
    position: relative;
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > button {
        border: 3px solid #bdbdbd;
        border-radius: 5px;
        width: 120px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 5px;
        color: #757575;
        &:disabled {
          border: 3px solid #757575;
          background: #757575;
          color: #fff;
        }
      }
    }
    > form {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      margin-top: 40px;
      input {
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        padding: 5px 4px;
        margin-bottom: 10px;
        &::placeholder {
          font-size: 15px;
          color: #bdbdbd;
        }
      }
      button {
        background: #bdbdbd;
        padding: 4px;
        border-radius: 5px;
        color: #fafafa;
        margin-top: 10px;
      }
    }
  }
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export default StyledLoginModal;
