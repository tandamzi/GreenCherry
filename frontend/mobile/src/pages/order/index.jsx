import React, { useState } from 'react';

import List from './list';
import Map from './map';

import Container from '@/components/Container';

const order = () => {
  const [toggleState, setToggleState] = useState(false);
  const changeToggle = () => {
    setToggleState(prev => !prev);
  };
  return (
    <Container>
      <div className="absolute z-20 left-1/2 -translate-x-1/2 top-3 inline-block w-28 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="toggle-checkbox hidden"
          checked={toggleState}
          readOnly
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-9 rounded-full shadow-md cursor-pointer bg-bgcolor opacity-80"
        >
          <span
            className={`toggle-inner block w-14 h-9 bg-primaryevent rounded-full shadow transform transition-transform duration-200 ease-in-out ${
              toggleState ? 'translate-x-full' : 'translate-x-0 '
            }`}
          />
        </label>
        <div
          className="absolute inset-y-0 left-1 flex items-center pl-3 text-sm text-primaryfont font-bold cursor-pointer"
          onClick={changeToggle}
        >
          지도
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-primaryfont font-bold cursor-pointer"
          onClick={changeToggle}
        >
          리스트
        </div>
      </div>

      {!toggleState ? <Map /> : <List />}
    </Container>
  );
};

export default order;
