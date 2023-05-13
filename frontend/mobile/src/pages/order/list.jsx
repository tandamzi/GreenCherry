import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import cn from 'classnames';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import Container from '@/components/Container';
import ImageSlider from '@/components/ImageContainer/ImageSlider';

const list = () => {
  const storeList = useSelector(state => state.storeList.storeList);
  const router = useRouter();
  useEffect(() => {}, storeList);

  const goToStore = id => {
    router.push(`/store/${id}`);
  };
  return (
    <div className="bg-bgcolor">
      <div
        className={
          (style['order-list-header'], 'h-32 mb-2 opacity-70 bg-itembg')
        }
      />
      <div className="px-4 pb-20">
        {storeList &&
          storeList.map((item, index) => {
            return (
              <div
                key={item.id}
                className={cn(
                  'bottom py-4 border-line',
                  index !== storeList.length - 1 ? 'border-b' : '',
                )}
              >
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => goToStore(item.id)}
                >
                  <span className="text-primaryfont text-2xl font-bold">
                    {item.name}
                  </span>
                  <span className="pl-2 text-secondary text-xs">
                    {item.type.name}
                  </span>
                </button>

                <div className="flex justify-between w-full">
                  <button
                    type="button"
                    className="text-sm cursor-pointer"
                    onClick={() => goToStore(item.id)}
                  >
                    {item.address.addressName} {item.address.detailAddressName}
                  </button>
                  <button
                    type="button"
                    className="text-sm cursor-pointer"
                    onClick={() => goToStore(item.id)}
                  >
                    리뷰{' '}
                    <span className="text-secondary">
                      {item.numberOfReview}
                    </span>
                  </button>
                </div>

                <div className="mt-2 mb-1">
                  <ImageSlider
                    onClick={() => goToStore(item.id)}
                    images={item.images}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className="sticky w-full z-20 bottom-7 flex justify-center">
        <Container.MainFooterWithNavigation position="stiky" />
      </div>
    </div>
  );
};

export default list;
