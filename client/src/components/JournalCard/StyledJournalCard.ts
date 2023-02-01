import { css } from '@emotion/react';

const StyledJournalCard = css`
  border: 2px solid #757575;
  border-radius: 5px;
  max-width: 46%;
  min-height: 120px;
  padding: 20px 40px;
  margin: 16px 8px;
  h4 {
    font-weight: 700;
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
`;

export default StyledJournalCard;
