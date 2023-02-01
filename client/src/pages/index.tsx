import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import JournalCard from '../components/JournalCard';
import { Journal } from '../model/Journals';
import StyledMain from './StyledMain';

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const Main = () => {
  const { data: journals } = useQuery(['journals'], () => {
    return axios.get(`${baseUrl}/journals`);
  });
  // console.log(journals);

  const journalList = useMemo(() => journals?.data, [journals]);
  console.log(journalList);

  return (
    <section css={StyledMain}>
      <div className="container">
        <h3>Journal</h3>
        <hr />
        <div>
          {journalList?.map((item: Journal) => (
            <JournalCard item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;
