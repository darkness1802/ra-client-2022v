import React, { useCallback } from 'react';
import styled from 'styled-components';
import { MdMeetingRoom, MdScreenShare } from "react-icons/md"
import {
    BsMicFill, BsMicMuteFill,
    BsCameraVideoFill, BsCameraVideoOffFill,
    BsFillStopCircleFill, BsMessenger,
    BsFillInfoCircleFill, BsFillPeopleFill
} from "react-icons/bs"

const BottomBar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  return (
    <div className="absolute right-0 bottom-0 flex items-center justify-between w-full h-[10%] bg-darkgreen p-4">
      <div className="left flex items-center justify-center">
        <button onClick={() => toggleCameraAudio("video")}>
          { userVideoAudio.video ? 
            <BsCameraVideoFill className="text-white text-2xl" />
              :<BsCameraVideoOffFill className="text-red-500 text-2xl" /> }
        </button>

        {showVideoDevices && (
          <SwitchList>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                return <div key={device.deviceId} onClick={clickCameraDevice} data-value={device.deviceId} >{device.label}</div>;
              })}
            <div>Switch Camera</div>
          </SwitchList>
        )}
        <button onClick={handleToggle} className="mx-2">
          <i className='fas fa-angle-up text-white'></i>
        </button>

        <button onClick={() => toggleCameraAudio("audio")}>
          { userVideoAudio.audio ? 
            <BsMicFill className="text-white text-2xl" />
              :<BsMicMuteFill className="text-red-500 text-2xl" /> }
        </button>
      </div>
      <div className="center flex items-center gap-6">
        <button onClick={clickChat}>
          <BsMessenger className="text-white text-2xl" />
        </button>

        <button onClick={goToBack}>
          <BsFillStopCircleFill className="text-red-500 text-3xl" />
        </button>

        <button onClick={clickScreenSharing}>
          <MdScreenShare className="text-white text-3xl" />
        </button>
      </div>
      <div className="right flex gap-6 items-center">
        <button>
          <BsFillInfoCircleFill className="text-white text-2xl" />
        </button>
        <button>
          <BsFillPeopleFill className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};



const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: #4ea1d3;
`;
const Left = styled.div`
  display: flex;
  align-items: center;

  margin-left: 15px;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const ScreenButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: #ee2560;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #ee2560;
  border-radius: 15px;

  :hover {
    background-color: #f25483;
    cursor: pointer;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;

const SwitchMenu = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  top: 7px;
  left: 80px;
  z-index: 1;

  :hover {
    background-color: #476d84;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  > i {
    width: 90%;
    font-size: calc(10px + 1vmin);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -65.95px;
  left: 80px;
  background-color: #1A1C1D;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

export default BottomBar