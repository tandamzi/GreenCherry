/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

import classnames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import OrderInfo from '@/components/OrderInfo';
import ReviewImageUpload from '@/components/review/ReviewImageUpload';
import clientHttp from '@/utils/csr/clientHttp';

const reviewForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });

  const [tagList, setTagList] = useState([]);
  const [deliciousTag, setDeliciousTag] = useState(false);
  const [tooMuchTag, setTooMuchTag] = useState(false);
  const [freshTag, setFreshTag] = useState(false);
  const [kindTag, setKindTag] = useState(false);

  const handleTagList = id => {
    if (tagList.includes(id)) {
      setTagList(tagList.filter(tag => tag !== id));
    } else {
      setTagList([...tagList, id]);
    }
  };

  return (
    <Container className=" ">
      <Container.SubPageHeader goHome title="리뷰작성" className="" />
      <Container.MainBody>
        <p className="font-bold text-xl my-2">이런점이 좋았어요</p>
        <div className="grid grid-cols-2 border-b border-line">
          <div
            className={classnames(
              deliciousTag
                ? 'bg-primary flex flex-row rounded-lg mr-4 mb-2 p-1 active:bg-itembg'
                : 'bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1  active:bg-primary',
            )}
            onClick={e => {
              e.preventDefault();
              setDeliciousTag(prev => !prev);
              handleTagList(1);
            }}
          >
            <Image
              src="/assets/icons/reviewIcons/deliciousIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm mob:mt-1">
              &quot;음식이 맛있어요&quot;
            </p>
          </div>
          <div
            className={classnames(
              freshTag
                ? 'bg-primary flex flex-row rounded-lg mr-4 mb-2 p-1 active:bg-itembg'
                : 'bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1  active:bg-primary',
            )}
            onClick={e => {
              e.preventDefault();
              setFreshTag(prev => !prev);
              handleTagList(2);
            }}
          >
            <Image
              src="/assets/icons/reviewIcons/freshIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm mob:mt-1">
              &quot;재료가 신선해요&quot;
            </p>
          </div>
          <div
            className={classnames(
              tooMuchTag
                ? 'bg-primary flex flex-row rounded-lg mr-4 mb-2 p-1 active:bg-itembg'
                : 'bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1  active:bg-primary',
            )}
            onClick={e => {
              e.preventDefault();
              setTooMuchTag(prev => !prev);
              handleTagList(3);
            }}
          >
            <Image
              src="/assets/icons/reviewIcons/toomuchIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm mob:mt-1">
              &quot;양이 많아요&quot;
            </p>
          </div>
          <div
            className={classnames(
              kindTag
                ? 'bg-primary flex flex-row rounded-lg mr-4 mb-2 p-1 active:bg-itembg'
                : 'bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1  active:bg-primary',
            )}
            onClick={e => {
              e.preventDefault();
              setKindTag(prev => !prev);
              handleTagList(4);
            }}
          >
            <Image
              src="/assets/icons/reviewIcons/kindIcon.svg"
              width={100}
              height={100}
              className="h-5 flex-none w-fit m-1 ml-2"
              alt="devday main logo"
            />
            <p className="mt-2 text-xs mob:text-sm mob:mt-1">
              &quot;사장님이 친절해요&quot;
            </p>
          </div>
        </div>
        <ReviewImageUpload />
        <ReviewImageUpload />
        <ReviewImageUpload />
        <button
          type="button"
          onClick={e => {
            e.preventDefault();
          }}
        >
          작성하기
        </button>
      </Container.MainBody>
    </Container>
  );
};

export default reviewForm;
