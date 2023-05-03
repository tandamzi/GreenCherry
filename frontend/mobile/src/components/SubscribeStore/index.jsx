import cs from 'classnames';
import Image from 'next/image';

const SubscribeStore = ({ className, children }) => {
  return (
    <div className="grid grid-cols-3">
      <div>
        <Image
          src="/assets/testImage/store1.png"
          width={125}
          height={125}
          alt="greencherry subscribeBox"
        />
      </div>
      <div>
        <h1>상호명</h1>
      </div>
      <div>
        <h1>버튼</h1>
      </div>
    </div>
  );
};

export default SubscribeStore;
