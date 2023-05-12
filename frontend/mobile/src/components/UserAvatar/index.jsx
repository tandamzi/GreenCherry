import React, { useEffect, useState, useRef } from 'react';
import { ImCancelCircle } from 'react-icons/im';

import classnames from 'classnames';
import Image from 'next/image';
import Swal from 'sweetalert2';

import style from './index.module.scss';

import { httpForm } from '@/server/api/http';

export const UserAvatar = ({
  imageURL,
  width,
  height,
  changable,
  ...props
}) => {
  const inputRef = useRef(null);

  const [imgFile, setImgFile] = useState(imageURL);

  const onClickImageInput = event => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = e => {
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
      });
      return;
    }

    reader.readAsDataURL(inputRef.current.files[0]);

    const data = new FormData();
    data.append('profileImg', inputRef.current.files[0] || null);

    httpForm
      .patch('{UPDATE_PROFILE_URL}', data)
      .then(res => {
        window.location.reload();
      })
      .catch(err => {});
  };

  const updateProfileDefaultImg = () => {
    setImgFile(require('../../../public/assets/Images/default-user.png'));

    httpForm
      .patch('UPDATE_DEFAULT_PROFILE_URL')
      .then(res => {
        window.location.reload();
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
      <Image
        src={
          imageURL || require('../../../public/assets/Images/default-user.png')
        }
        alt="프로필 이미지"
        className="style.Image rounded-full object-cover"
        onClick={changable ? dummyFunction : onClickImageInput}
        width={100}
        height={100}
      />
      {changable || (
        <div>
          <div className="flex justify-end px-4 pt-36">
            <ImCancelCircle
              className="text-xl text-red-400 z-50"
              onClick={updateProfileDefaultImg}
            />
          </div>
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            className={style.ImgInput}
            id="logoImg"
            accept="image/*"
            name="file"
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

UserAvatar.propTypes = {};

UserAvatar.defaultProps = {
  changable: true,
};
