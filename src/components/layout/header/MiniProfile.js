import {Popover} from 'antd';
import { useMemo, useState } from 'react';
const text = <span>차차아버님</span>;
const content = (
  <div className='ProfileDetail'>
    <img className='ProfileImg' src="img/bonobono.png"></img>
    <p>닉네임</p>
    <p>미니프로필에 뭐 넣으면 좋을까</p>
  </div>
);
const MiniProfile = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  
  const mergedArrow = useMemo(() => {
    if (arrowAtCenter)
      return {
        pointAtCenter: true,
      };
    return showArrow;
  }, [showArrow, arrowAtCenter]);
  return (



        <Popover placement="bottomLeft" title={text} content={content} arrow={mergedArrow}>
          <img className='ProfileImg' src="img/bonobono.png"></img>
        </Popover>

  );
};
export default MiniProfile;