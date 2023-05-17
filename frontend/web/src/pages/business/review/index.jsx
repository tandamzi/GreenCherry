/* eslint-disable no-promise-executor-return */
import React, { useEffect, useState } from 'react';

import Container from '@/components/Container';
import ReviewList from '@/components/ReviewList';
import useMember from '@/hooks/memberHook';
import { getReviewCount, getPagableReviewList } from '@/utils/api/review';

const Review = () => {
  const { memberAttributes } = useMember();
  const [reviewList, setReviewList] = useState(null);
  const [page, setPage] = useState(0);
  const [pageEnd, setpageEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    getReviewCount(memberAttributes.storeId).then(res => {
      setReviewCount(res.data);
    });
    getPagableReviewList(memberAttributes.storeId, page).then(res => {
      setReviewList(res.reviewList);
    });
  }, []);

  const loadMoreReviews = async () => {
    if (pageEnd || isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;
    getPagableReviewList(memberAttributes.storeId, nextPage)
      .then(res => new Promise(resolve => setTimeout(() => resolve(res), 1000)))
      .then(res => {
        if (res.orderList.length === 0) {
          setpageEnd(true);
          return;
        }
        setReviewList(prevList => [...prevList, ...res.reviewList]);
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => setIsLoading(false)); // Stop loading
  };

  return (
    <Container>
      <Container.BusinessHeader />
      <Container.MainBody className="bg-bgcolor h-full ">
        <div className="flex items-center mx-8 mt-8">
          <p className="font-bold text-xl pr-4">사용자 리뷰</p>
          <span className=" text-sm align-text-bottom">
            <span className="text-secondary">{reviewCount}</span>건
          </span>
        </div>
        <div className="w-full h-full max-w-4xl relative">
          <ReviewList
            reviewList={reviewList}
            reviewCount={reviewCount}
            loadMoreReviews={loadMoreReviews}
          />
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Review;
