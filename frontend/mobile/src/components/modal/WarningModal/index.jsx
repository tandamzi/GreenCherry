import React, { Fragment, useRef, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const WarningModal = ({ open, setOpen, orderQuantity }) => {
  const cancelButtonRef = useRef(null);
  const navigate = useRouter();
  const [warningCheck, setWarningCheck] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-disabled bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {warningCheck ? (
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-bgcolor text-left shadow-xl transition-all sm:my-8 sm:w-2/3">
                  <div className="bg-white px-14">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left">
                        <Dialog.Title
                          as="h2"
                          className="text-2xl font-bold leading-6 text-gray-900 pb-4"
                        >
                          잠깐!
                        </Dialog.Title>
                        <div>
                          <p className="font-thin text-xs ">
                            알레르기를 일으킬 수 있는 성분이 있을 수 있습니다
                          </p>
                          <p className="font-thin text-xs">
                            알레르기표를 확인해주세요!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-8 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full bg-primary justify-center rounded-3xl px-4 py-2 text-base font-medium text-gray-700 shadow-sm active:bg-primaryevent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setWarningCheck(false)}
                    >
                      알겠습니다!
                    </button>
                  </div>
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-bgcolor text-left shadow-xl transition-all sm:my-8 sm:w-2/3">
                  <div className="bg-white px-14">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left">
                        <Dialog.Title
                          as="h2"
                          className="text-2xl font-bold leading-6 text-gray-900 pb-4"
                        >
                          주문!
                        </Dialog.Title>
                        <div>
                          <p className="font-bold text-xs mb-3">
                            체리박스 총 {orderQuantity} 개
                          </p>
                          <p className="font-bold text-xs">
                            영업 종료시간 이전에 찾아가주세요!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" px-8 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full bg-primary justify-center rounded-3xl px-4 py-2 text-base font-medium text-gray-700 shadow-sm active:bg-primaryevent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                        navigate.push('/');
                      }}
                      ref={cancelButtonRef}
                    >
                      주문하기
                    </button>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default WarningModal;
