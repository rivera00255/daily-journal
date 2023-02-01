import { Journal } from '../../model/Journals';
import StyledJournalCard from './StyledJournalCard';

const JournalCard = ({ item }: { item: Journal }) => {
  return (
    <div css={StyledJournalCard}>
      <h4>{item.createdAt}</h4>
      <p>{item.location}</p>
      <p>{item.weather.temperature}℃</p>
      <p>{item.content}</p>
    </div>
  );
};

export default JournalCard;
