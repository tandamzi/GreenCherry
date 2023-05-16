import { useEffect, useState } from 'react';

import Image from 'next/image';

const DELICIOUS_ICON_URL = '/assets/icons/reviewIcons/deliciousIcon.svg';
const TOOMUCH_ICON_URL = '/assets/icons/reviewIcons/toomuchIcon.svg';
const FRESH_ICON_URL = '/assets/icons/reviewIcons/freshIcon.svg';
const KIND_ICON_URL = '/assets/icons/reviewIcons/kindIcon.svg';
const CRYING_ICON_URL = `/assets/icons/etcIcons/crying-face.svg`;

const StoreReview = ({ tagInfo }) => {
  const [total, setTotal] = useState(0);
  const sortedTags = [...tagInfo].sort((a, b) => b.count - a.count);
  useEffect(() => {
    const sumCount = sortedTags.reduce((acc, tag) => acc + tag.count, 0);
    setTotal(sumCount);
  });

  const getIconUrl = id => {
    switch (id) {
      case 1:
        return DELICIOUS_ICON_URL;
      case 2:
        return TOOMUCH_ICON_URL;
      case 3:
        return FRESH_ICON_URL;
      case 4:
        return KIND_ICON_URL;
      default:
        return '';
    }
  };

  return { total } === 0 ? (
    <div className="">
      <div className="flex flex-row justify-between items-center mx-8 mt-8 mb-3">
        <p className="font-bold text-xl pr-4">이런점이 좋았어요</p>
        <span className=" text-sm align-text-bottom">
          <span className="text-secondary">{total}</span>회 참여
        </span>
      </div>

      {sortedTags.map(tag => (
        <div key={tag.id} className="flex items-center mx-7">
          <div className="w-full relative my-2">
            <div className="flex justify-between items-center px-4 pt-1.5">
              <div className="flex h-7 items-center">
                <div className="relative w-7 h-7 mr-2 z-20">
                  <Image src={getIconUrl(tag.id)} fill alt={tag.name} />
                </div>
                <p className="z-20 pt-0.5">{`"${tag.name}"`}</p>
              </div>
              <p className="z-20 pt-0.5">{tag.count}</p>
            </div>

            <div className="absolute w-full h-10 top-0 z-10 bg-itembg rounded-xl">
              <div
                style={{ width: `${(tag.count / total) * 100 + 10}%` }}
                className="h-full bg-primary rounded-xl"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="pb-8 border-line border-b -mx-4" />
    </div>
  ) : (
    <div />
  );
};

export default StoreReview;
