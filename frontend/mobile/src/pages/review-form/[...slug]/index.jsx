/* eslint-disable no-restricted-syntax */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';

import classnames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import OrderInfo from '@/components/OrderInfo';
import ReviewImageUpload from '@/components/review/ReviewImageUpload';
import clientHttp, { clientHttpForm } from '@/utils/csr/clientHttp';

const reviewForm = req => {
  const memberId = req?.location?.query?.slug?.[0];
  const storeId = req?.location?.query?.slug?.[1];
  const orderId = req?.location?.query?.slug?.[2];
  const router = useRouter();

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

  const [imageList, setImageList] = useState([]);

  const handleTagList = id => {
    if (tagList.includes(id)) {
      setTagList(tagList.filter(tag => tag !== id));
    } else {
      setTagList([...tagList, id]);
    }
  };

  const onSubmit = async data => {
    const result = {
      ...data,
      memberId,
      storeId,
      orderId,
      tags: tagList,
    };

    const formData = new FormData();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < imageList.length; i++) {
      Array.from(imageList[i]).forEach((file, index) => {
        formData.append(`images${i}`, file);
      });
    }
    formData.append('data', JSON.stringify(result));

    try {
      const response = await clientHttpForm.post('/review-form', formData);
      // console.log(response.data);
      if (response.data.success) {
        router.push('/');
      } else {
        router.push('/');
      }
      return response.data;
    } catch (error) {
      // console.log(error);
      throw new Error('File upload failed');
    }
  };

  return (
    <Container className=" ">
      <Container.SubPageHeader goHome title="리뷰작성" className="" />
      <Container.MainBody>
        <p className="font-bold text-xl my-2">이런점이 좋았어요</p>
        <form>
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
          <div className="flex flex-row my-4">
            <ReviewImageUpload
              id={0}
              imageList={imageList}
              setImageList={setImageList}
            />
            <ReviewImageUpload
              id={1}
              imageList={imageList}
              setImageList={setImageList}
            />
            <ReviewImageUpload
              id={2}
              imageList={imageList}
              setImageList={setImageList}
            />
          </div>
          <div>
            <textarea
              {...register('content', {
                required: true,
              })}
              placeholder="리뷰를 작성해주세요"
              className=" bg-itembg rounded-xl w-full h-56 p-2"
            />
          </div>
          <div className="flex flex-col mt-1">
            <button
              className="bg-primary p-2 rounded-lg justify-self-en active:bg-primaryevent"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              작성하기
            </button>
          </div>
        </form>
      </Container.MainBody>
    </Container>
  );
};

export default reviewForm;
