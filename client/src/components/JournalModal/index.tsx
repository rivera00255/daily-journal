import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { Journal } from '../../model/Journals';
import { baseUrl } from '../../pages';
import { ReactComponent as PencilIcon } from '../../assets/icon/blog-pencil.svg';
import { ReactComponent as CloseIcon } from '../../assets/icon/cross.svg';
import StyledJournalModal from './StyledJournalModal';

const JournalModal = ({
  popup,
  setPopup,
}: {
  popup: { status: boolean; id: number };
  setPopup: Dispatch<SetStateAction<{ status: boolean; id: number }>>;
}) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [edit, setEdit] = useState(false);

  const queryClient = useQueryClient();

  const { data: journalData } = useQuery(
    ['journal', popup.id],
    () => {
      return axios.get(`${baseUrl}/journals/${popup.id}`);
    },
    { enabled: popup.status }
  );
  // console.log(journalData);

  const { mutate: updateJournal } = useMutation(
    (journal: Journal) => {
      return axios.put(`${baseUrl}/journals/${journal.id}`, journal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['journal']);
        setEdit(false);
      },
      onError: (err) => console.log(err),
    }
  );

  const { mutate: deleteJournal } = useMutation(
    (id: number) => {
      return axios.delete(`${baseUrl}/journals/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['journals']);
        setEdit(false);
        setPopup({ status: false, id: 0 });
      },
    }
  );

  const journal: Journal = useMemo(() => journalData?.data, [journalData]);

  return (
    <div css={StyledJournalModal}>
      <div className="container">
        <button className="close-button" onClick={() => setPopup({ status: false, id: 0 })}>
          <CloseIcon width="14px" height="14px" fill="#757575" />
        </button>
        <h4>{journal?.createdAt.substring(0, 10).replaceAll('-', '/')}</h4>
        <textarea className={edit ? 'active' : ''} defaultValue={journal?.content} readOnly={!edit} ref={contentRef} />
        <div>
          <p>{journal?.location}</p>
          <p>
            <strong>{journal?.weather.temperature}°</strong>
          </p>
        </div>
        <p>writer</p>
        <div className="button-wrapper">
          {edit === true ? (
            <>
              <button
                onClick={() => {
                  if (contentRef.current && contentRef.current.value !== '') {
                    updateJournal({
                      ...journal,
                      content: contentRef.current.value.toString(),
                    });
                  }
                }}>
                update
              </button>
              <button
                onClick={() => {
                  if (confirm('정말 삭제하시겠습니까?')) {
                    deleteJournal(Number(popup.id));
                  }
                }}>
                delete
              </button>
            </>
          ) : (
            <button onClick={() => setEdit(true)}>
              <PencilIcon width="24px" height="22px" fill="#bdbdbd" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
