import StyledLoginModal from './StyledLoginModal';
import joi from 'joi';
import { Dispatch, SetStateAction, SyntheticEvent, useRef, useState } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/icon/cross.svg';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { baseUrl } from '../../pages';
import { User } from '../../model/Users';
import { useSetRecoilState } from 'recoil';
import authState from '../../recoils/auth';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const LoginModal = ({ popup, setPopup }: { popup: boolean; setPopup: Dispatch<SetStateAction<boolean>> }) => {
  const [chooseLogin, setChooseLogin] = useState(true);

  const modalRef = useOutsideClick(() => setPopup(false));

  const setAuthState = useSetRecoilState(authState);

  const navigate = useNavigate();

  const { mutate: signup } = useMutation(
    (user: User) => {
      return axios.post(`${baseUrl}/users`, user);
    },
    {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다.');
        setChooseLogin(false);
      },
      onError: (err: AxiosError<{ error: string }>) => {
        console.log(err);
        alert(err?.response?.data.error);
      },
    }
  );

  const { mutate: login } = useMutation(
    (user: User) => {
      return axios.post(`${baseUrl}/login`, user);
    },
    {
      onSuccess: (data) => {
        // console.log(data);
        setAuthState((prev) => ({ ...prev, user: data?.data?.user.email, token: data?.data.token }));
        setPopup(false);
        navigate('/');
      },
      onError: (err: AxiosError<{ error: string }>) => {
        console.log(err);
        alert(err?.response?.data.error);
      },
    }
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: false }),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,16}$')),
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      if (emailRef.current.value !== '' && passwordRef.current.value !== '') {
        const { error, value } = schema.validate({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        if (error === undefined) {
          chooseLogin ? login(value) : signup(value);
          // emailRef.current.value = '';
          // passwordRef.current.value = '';
        }
      } else {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
      }
    }
  };

  return (
    <div css={StyledLoginModal}>
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={() => setPopup(false)}>
          <CloseIcon width="14px" height="14px" />
        </button>
        <div>
          <button disabled={chooseLogin} onClick={() => setChooseLogin(true)}>
            로그인
          </button>
          <button disabled={!chooseLogin} onClick={() => setChooseLogin(false)}>
            회원가입
          </button>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <input type="text" placeholder="이메일" ref={emailRef} />
          <input type="password" placeholder="비밀번호(영어 대소문자, 숫자, 4 ~ 16자)" ref={passwordRef} />
          <button>{chooseLogin ? '로그인' : '가입하기'}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
