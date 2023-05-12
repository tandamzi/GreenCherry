/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import OrderInfo from '@/components/OrderInfo';
import clientHttp from '@/utils/csr/clientHttp';

const reviewForm = () => {
  return (
    <Container className=" ">
      <Container.SubPageHeader goHome title="리뷰작성" className="" />
      <Container.MainBody>
        <p className="font-bold text-xl my-2">이런점이 좋았어요</p>
        <div className="grid grid-cols-2">
          <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
            <Image
              src="/assets/icons/reviewIcons/deliciousIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm  ">
              &quot;음식이 맛있어요&quot;
            </p>
          </div>
          <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
            <Image
              src="/assets/icons/reviewIcons/freshIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm ">
              &quot;재료가 신선해요&quot;
            </p>
          </div>
          <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
            <Image
              src="/assets/icons/reviewIcons/toomuchIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm">&quot;양이 많아요&quot;</p>
          </div>
          <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
            <Image
              src="/assets/icons/reviewIcons/kindIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm">
              &quot;사장님이 친절해요&quot;
            </p>
          </div>
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default reviewForm;
