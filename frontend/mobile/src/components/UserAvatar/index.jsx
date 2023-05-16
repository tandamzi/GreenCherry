import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import classnames from 'classnames';
import Image from 'next/image';
import Swal from 'sweetalert2';

import style from './index.module.scss';
import LoadingSpinner from '../LoadingSpinner';

import { changeProfile } from '@/redux/member/memberReducer';
import { clientHttpForm } from '@/utils/csr/clientHttp';

export const UserAvatar = ({
  imageURL,
  width,
  height,
  changable,
  ...props
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);
  const [imgFile, setImgFile] = useState(imageURL);

  const onClickImageInput = event => {
    event.preventDefault();
    inputRef.current.click();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  });

  const onChange = e => {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      inputRef.current.src = target.result;
      setImgFile(inputRef.current.files[0]);
    };

    if (!inputRef.current.files[0]) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '사진을 선택해주세요',
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
      });

      return;
    }

    reader.readAsDataURL(inputRef.current.files[0]);

    const data = new FormData();
    data.append('profileImage', inputRef.current.files[0] || null);

    clientHttpForm
      .put('/member/image', data)
      .then(res => {
        const imageFile = res.data.data;
        setImgFile(imageFile);
        dispatch(changeProfile(imageFile));
      })
      .then(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1800);

        return () => clearTimeout(timer);
      })
      .catch(err => {});
  };

  const dummyFunction = () => {};

  return (
    <div
      className={classnames(style.UserAvatar, 'relative')}
      style={{
        width,
        height,
      }}
    >
      {!loading ? (
        <Image
          src={imgFile}
          alt="프로필 이미지"
          className="style.Image rounded-full object-cover"
          onClick={changable ? onClickImageInput : dummyFunction}
          fill
        />
      ) : (
        <LoadingSpinner />
      )}
      <div className="hidden">
        <input
          ref={inputRef}
          type="file"
          className={style.ImgInput}
          id="logoImg"
          accept="image/*"
          name="file"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

UserAvatar.propTypes = {};

UserAvatar.defaultProps = {
  changable: true,
};
