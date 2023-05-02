import React from 'react';
import { useForm } from 'react-hook-form';

import style from './index.module.scss';

import Container from '@/components/Container';

const Join = () => {
  const { register, handleSubmit } = useForm();
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
            <div className="relative">
              <input
                {...register('email', {
                  required: {
                    value: true,
                    message: '이메일을 입력해주세요.',
                  },
                })}
                autoComplete="off"
                id="email"
                type="text"
                className="text-2xl peer placeholder-transparent h-10 w-96 border-b-2 border-bgcolor bg-secondary text-bgcolor focus:outline-none"
                placeholder="가게 이름"
              />
              <label
                htmlFor="email"
                className="text-2xl absolute left-0 -top-3.5 text-bgcolor peer-placeholder-shown:text-2xl peer-placeholder-shown:text-bgcolor peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-bgcolor peer-focus:text-base"
              >
                가게 이름
              </label>
            </div>
          </div>
        </div>
      </Container.MainBody>
    </Container>
  );
};

export default Join;
