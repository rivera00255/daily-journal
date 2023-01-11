import Map from '../../components/Map';
import WeatherForecast from '../../components/WeatherForecast';
import StyledKeepJournal from './StyledKeepJournal';

const KeepJournal = () => {
  return (
    <section css={StyledKeepJournal}>
      <div className="container">
        <h3>Keep a Journal</h3>
        <div>
          <WeatherForecast />
          {/* <Map /> */}
        </div>
        <div>
          <input type="text" placeholder="오늘의 기록..." />
          <button>기록하기</button>
        </div>
      </div>
    </section>
  );
};

export default KeepJournal;
