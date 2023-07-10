import React, { useRef, useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { auth } from '../root';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import socket from '../socket';

const Join = (props) => {
  const __auth__ = useRecoilValue(auth);
  const userName = useRef()
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { course } = useParams()

  // Trong tương lai sẽ kiểm tra xem student đã Enroll vào course này chưa { nếu chưa thì sẽ redirect về dashboard }

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        // const _roomId = roomId.current.value;
        const _userName = userName?.current?.value;
        const _course = course
        sessionStorage.setItem('user', _userName);
        props.history.push(`/room/${_course}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {

    const _userName = userName?.current?.value;
    const _course = course

    if (!_userName) {
      setErr(true);
      setErrMsg('Enter Room ID or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: _course, userName: _userName });
    }
  }

  return __auth__ ? <div className="w-screen h-screen bg-heavydark flex items-center justify-center">
    <div className='flex flex-col items-center justify-center w-[50%] bg-lightdark rounded-xl p-12 gap-6'>
      
      <h1 className='text-white text-xl font-bold uppercase'>Join a class</h1>

      <input readOnly placeholder={`Room ID: ${course}`} className="text-white text-center rounded-xl bg-heavydark placeholder:text-gray-600 h-[35px] w-[80%]" type="text" id="roomId" value={"Room ID: "+course} />
      
      <input placeholder="Enter Your Name Here" className="text-white text-center rounded-xl bg-heavydark placeholder:text-gray-600 h-[35px] w-[80%]" type="text" id="userName" ref={userName} />
      
      <small onClick={() => props.history.push('/dashboard')} className='text-gray-400 cursor-pointer hover:text-sky-500 hover:underline decoration-solid'>Or Back to Dashboard</small>
      <button onClick={clickJoin} className="mt-2 w-[80%] text-white text-lg font-bold py-2 px-4 rounded-xl bg-darkgreen hover:bg-lightgreen"> JOIN </button>
      {err ? <Error>{errMsg}</Error> : null}
    </div>
  </div> : <Redirect to="/signin" />
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 150px;
  height: 35px;
  margin-left: 15px;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 40px;
  margin-top: 35px;
  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 25px;
  font-weight: 500;

  :hover {
    background-color: #7bb1d1;
    cursor: pointer;
  }
`;

export default Join;
