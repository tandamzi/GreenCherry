import React from 'react';
import { useForm } from 'react-hook-form';

import style from './index.module.scss';

import Container from '@/components/Container';

const Join = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });
  return (
    <Container>
      <Container.MainHeader />
      <Container.MainBody className="bg-secondary">
        <div>
          <div className="text-bgcolor text-center mb-24">
            <h1 className="text-7xl mb-6">RESISTE YOUR STORE</h1>
            <h3 className="text-4xl font-thin">
              남은 음식을 수익으로 바꿔봐요
            </h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative my-5 border-b-2 border-bgcolor">
              <input
                {...register('name', {
                  required: true,
                })}
                autoComplete="off"
                id="name"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-96  bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                placeholder="상호명"
              />
              <label
                htmlFor="name"
                className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                상호명
              </label>
            </div>
            {errors.name && errors.name.type === 'required' && (
              <p className={style['error-text']}>상호명을 입력해주세요</p>
            )}
            <div className="relative my-5 border-b-2 border-bgcolor w-96 flex">
              <div className="w-80 overflow-hidden">
                <input
                  {...register('businessLicenseNumber', {
                    required: true,
                    pattern: /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/,
                  })}
                  autoComplete="off"
                  id="businessLicenseNumber"
                  type="text"
                  className="text-2xl peer placeholder-transparent h-10 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                  placeholder="사업자 등록 번호"
                />
                <label
                  htmlFor="businessLicenseNumber"
                  className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
                >
                  사업자 등록 번호
                </label>
              </div>
              <button type="button" className={`${style['check-button']}`}>
                확인하기
              </button>
            </div>
            {errors.businessLicenseNumber &&
              errors.businessLicenseNumber.type === 'required' && (
                <p className={style['error-text']}>
                  사업자 등록 번호를 입력해주세요
                </p>
              )}
            {errors.businessLicenseNumber &&
              errors.businessLicenseNumber.type === 'pattern' && (
                <p className={style['error-text']}>
                  사업자 등록 번호를 확인해주세요
                </p>
              )}
            <div className="relative my-5 border-b-2 border-bgcolor">
              <input
                {...register('ownerName', {
                  required: true,
                  pattern: /^[가-힣]{2,10}$/,
                })}
                autoComplete="off"
                id="ownerName"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-96 bg-secondary text-bgcolor focus:outline-none placeholder-secondary"
                placeholder="대표자 성명"
              />
              <label
                htmlFor="ownerName"
                className="text-base absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                대표자 성명
              </label>
            </div>
            {errors.ownerName && errors.ownerName.type === 'required' && (
              <p className={style['error-text']}>대표자 성명을 입력해주세요</p>
            )}
            {errors.ownerName && errors.ownerName.type === 'pattern' && (
              <p className={style['error-text']}>
                대표자 성명은 2~10자 한글로 입력해주세요
              </p>
            )}
          </div>
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Join;
