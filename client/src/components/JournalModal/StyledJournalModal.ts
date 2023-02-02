import { css } from '@emotion/react';

const StyledJournalModal = css`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(117, 117, 117, 0.4);
  .container {
    min-height: 50vh;
    max-height: 90vh;
    background: #fafafa;
    border-radius: 5px;
    padding: 40px;
    position: relative;
    h4 {
      position: relative;
      margin-bottom: 8px;
      font-weight: 700;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 50px;
        height: 40px;
        background: #757575;
        left: -60px;
        top: calc(50% - 20px);
      }
    }
    textarea {
      width: 100%;
      min-height: 120px;
      resize: none;
      padding: 4px 8px;
      border-radius: 5px;
      background: #fafafa;
      &:focus {
        outline: none;
      }
    }
    > div {
      display: flex;
      justify-content: left;
      > p {
        color: #757575;
        font-size: 13px;
        > strong {
          margin-left: 5px;
        }
      }
    }
    .active {
      border: 1px solid #bdbdbd;
      background: #fff;
    }
    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .button-wrapper {
      justify-content: right;
      margin-top: 10px;
      > button {
        margin: 0 5px;
      }
    }
  }
`;

export default StyledJournalModal;
