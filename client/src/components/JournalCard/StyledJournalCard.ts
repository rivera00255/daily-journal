import { css } from '@emotion/react';

const StyledJournalCard = css`
  border: 2px solid #757575;
  border-radius: 5px;
  max-width: 45%;
  min-height: 120px;
  padding: 20px 40px;
  margin: 16px 8px;
  position: relative;
  cursor: pointer;
  h4 {
    /* font-weight: 600; */
    position: relative;
    margin-bottom: 8px;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 40px;
      height: 8px;
      background: #757575;
      left: -50px;
      top: calc(50% - 5px);
    }
  }
  > p {
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:last-of-type {
      font-size: 13px;
      margin-bottom: 0;
      font-weight: 200;
    }
  }
  > div {
    display: flex;
    > p {
      color: #757575;
      font-size: 13px;
      > strong {
        margin-left: 5px;
      }
    }
  }
`;

export default StyledJournalCard;
