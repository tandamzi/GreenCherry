import Image from 'next/image';

const ReviewTag = ({ tag }) => {
  let ComponentToRender = null;

  if (tag === '음식이 맛있어요') {
    ComponentToRender = <Component1 tag={tag} />;
  } else if (tag === '재료가 신선해요') {
    ComponentToRender = <Component2 tag={tag} />;
  } else if (tag === '양이 많아요') {
    ComponentToRender = <Component3 tag={tag} />;
  } else {
    ComponentToRender = <Component4 tag={tag} />;
  }

  return <div>{ComponentToRender}</div>;
};

// 조건에 따라 렌더링될 컴포넌트들
const Component1 = ({ tag }) => {
  return (
    <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2">
      <Image
        src="/assets/icons/reviewIcons/deliciousIcon.svg"
        width={100}
        height={100}
        className="h-5 flex-none w-fit m-1 ml-2"
        alt="devday main logo"
      />
      <p className="mt-2 text-xs mob:text-sm mt-2 ">&quot;{tag}&quot;</p>
    </div>
  );
};

const Component2 = ({ tag }) => {
  return (
    <div>
      <div className="bg-itembg flex flex-row rounded-lg mr-4">
        <Image
          src="/assets/icons/reviewIcons/freshIcon.svg"
          width={100}
          height={100}
          className="h-5 flex-none w-fit m-1 ml-2"
          alt="devday main logo"
        />
        <p className="mt-2 text-xs mob:text-sm mt-2 ">&quot;{tag}&quot;</p>
      </div>
    </div>
  );
};
const Component3 = ({ tag }) => {
  return (
    <div>
      <div className="bg-itembg flex flex-row rounded-lg  mr-4">
        <Image
          src="/assets/icons/reviewIcons/toomuchIcon.svg"
          width={100}
          height={100}
          className="h-5 flex-none w-fit m-1 ml-2"
          alt="devday main logo"
        />
        <p className="mt-2 text-xs mob:text-sm mt-2 ">&quot;{tag}&quot;</p>
      </div>
    </div>
  );
};
const Component4 = ({ tag }) => {
  return (
    <div>
      <div className="bg-itembg flex flex-row rounded-lg mr-4">
        <Image
          src="/assets/icons/reviewIcons/kindIcon.svg"
          width={100}
          height={100}
          className="h-5 flex-none w-fit m-1 ml-2"
          alt="devday main logo"
        />
        <p className="mt-2 text-xs mob:text-sm mt-2 ">&quot;{tag}&quot;</p>
      </div>
    </div>
  );
};

export default ReviewTag;
