/* eslint-disable no-alert */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container';

const Member = () => {
  return (
    <Container>
      <Container.MainHeader />
      <Container.MainBody className="bg-secondary h-full">
        <div className="text-bgcolor text-center mb-10">
          <h1 className="text-7xl mb-6 font-bold tablet:text-3xl">
            마감시간에 지구를 구해요
          </h1>
          <h3 className="text-4xl font-thin tablet:text-xl">
            좋은 가격에 음식을 구매해봐요
          </h3>
        </div>
        <div className="flex flex-wrap justify-center items-center tablet:flex-col">
          <a
            href="https://greencherry.store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/logo/user-url-page.svg"
              width={160}
              height={160}
              alt="user-url"
              className="mr-4 tablet:m-0 tablet:mb-4"
            />
          </a>
          <Image
            src="/assets/logo/korean-google-play.svg"
            width={280}
            height={151}
            alt="google-play"
            onClick={() => {
              alert('준비중입니다.');
            }}
            className="mr-4 tablet:m-0 tablet:w-40 tablet:mb-4"
          />
          <Image
            src="/assets/logo/korean-app-store.svg"
            width={280}
            height={151}
            alt="app-store"
            onClick={() => {
              alert('준비중입니다.');
            }}
            className="mr-4 tablet:m-0 tablet:w-40"
          />
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Member;
