import { Dispatch, SetStateAction, useState } from 'react';
import { Journal } from '../../model/Journals';
import StyledJournalCard from './StyledJournalCard';

const JournalCard = ({
  item,
  setPopup,
}: {
  item: Journal;
  setPopup: Dispatch<SetStateAction<{ status: boolean; id: number }>>;
}) => {
  return (
    <div css={StyledJournalCard} onClick={() => setPopup({ status: true, id: Number(item.id) })}>
      <h4>{item.createdAt.substring(0, 10).replaceAll('-', '/')}</h4>
      <p>{item.content}</p>
      <div>
        <p>{item.location}</p>
        <p>
          <strong>{item.weather.temperature}°</strong>
        </p>
      </div>
      <p>writer</p>
    </div>
  );
};

export default JournalCard;
