import React, { Fragment, useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import clientHttp from '@/utils/csr/clientHttp';

const ShortsPlayModal = ({
  selectedVideoId,
  videos,
  modalIsOpen,
  setModalIsOpen,
  handleModalScroll,
  currentIndex,
  handleVideoEnd,
}) => {
  const cancelButtonRef = useRef(null);

  const opts = {
    width: '300',
    height: '220',
    playerVars: {
      controls: 0,
      loop: 1,
      disablekb: 1,
      autohide: 0,
      autoplay: 0,
      fs: 0,
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
  };

  const handleClose = () => {
    setModalIsOpen(prev => !prev);
  };
  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
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
          <div className="flex h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden w-full h-full rounded-lg bg-bgcolor text-left shadow-xl transition-all sm:my-8 sm:w-2/3">
                <div className=" px-8 pt-4 pb-5 sm:flex sm:flex-row-reverse sm:px-6">
                  <div className="modal-content" onScroll={handleModalScroll}>
                    {videos.map((item, idx) => (
                      <div key={idx} style={{ marginBottom: 10 }}>
                        {currentIndex === idx ? (
                          <YouTube
                            videoId={selectedVideoId}
                            opts={opts}
                            onEnd={handleVideoEnd}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full bg-primary justify-center rounded-3xl px-4 py-2 text-lg font-bold  shadow-sm active:bg-primaryevent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalIsOpen(prev => !prev)}
                  >
                    모달닫기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ShortsPlayModal;
