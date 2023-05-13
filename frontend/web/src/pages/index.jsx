import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './index.module.scss';

import Container from '@/components/Container';

export default function Home() {
  return (
    <Container>
      <Container.MainHeader />
      <Container.PaddingZeroBody className="bg-secondary block text-bgcolor">
        <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
          <div className={`${style['section-item']}`}>
            <h2 className={`${style['title-text']}`}>
              행동을 <br />
              통한 <br />
              긍정적인 변화 <br />
            </h2>
            <p className={`${style['sub-text']}`}>
              음식물 쓰레기로 인한 온실가스 배출량 <br />
              <span className={`${style.emphasis}`}>
                연간 885만톤 <br />
              </span>
              Green Cherry와 함께 지구를 지켜가요
            </p>

            <div className={`${style['image-container']}`}>
              <div className={`${style['image-relative']}`}>
                <Image
                  src="/assets/images/money-growth.svg"
                  width={156}
                  height={156}
                  alt="money-growth"
                  className={`${style['money-growth']}`}
                />
                <Image
                  src="/assets/images/love-ecology.svg"
                  width={213}
                  height={213}
                  alt="love-ecology"
                  className={`${style['love-ecology']}`}
                />
                <Image
                  src="/assets/images/food-box.svg"
                  width={498}
                  height={498}
                  alt="greencherry box"
                  className={`${style['greencherry-box']}`}
                />
              </div>
            </div>
          </div>
          <div className="snap-always snap-center w-full h-screen bg-danger">
            <p>2</p>
          </div>
          <div className="snap-always snap-center w-full h-screen bg-disabled">
            <p>3</p>
          </div>
          <div className="snap-always snap-center w-full h-screen bg-warning">
            <p>4</p>
          </div>
          <div className="snap-always snap-center w-full h-screen bg-primaryfont">
            <p>5</p>
          </div>
        </div>
      </Container.PaddingZeroBody>
    </Container>
  );
}
