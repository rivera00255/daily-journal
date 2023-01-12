import { css } from '@emotion/react';

const StyledWeatherForecast = css`
  border: 2px solid #757575;
  border-radius: 5px;
  padding: 40px;
  margin: 0 10px;
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
      top: calc(50% - 8px);
    }
  }
`;

export default StyledWeatherForecast;
