import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo, useState } from 'react';
import JournalCard from '../components/JournalCard';
import JournalModal from '../components/JournalModal';
import { Journal } from '../model/Journals';
import StyledMain from './StyledMain';

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Main = () => {
  const [popup, setPopup] = useState({ status: false, id: 0 });

  const { data: journals } = useQuery(['journals'], () => {
    return axios.get(`${baseUrl}/journals`);
  });
  // console.log(journals);

  const journalList = useMemo(
    () =>
      journals?.data
        .sort((a: Journal, b: Journal) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
        .reverse(),
    [journals]
  );
  // console.log(journalList);

  return (
    <section css={StyledMain}>
      {popup.status && popup.id !== 0 && <JournalModal popup={popup} setPopup={setPopup} />}
      <div className="container">
        <h3>Journal</h3>
        <hr />
        <div>
          {journalList?.map((item: Journal) => (
            <JournalCard key={item.id} item={item} setPopup={setPopup} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
