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
    <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
      <div className="relative w-6 h-6 ml-1">
        <Image
          src="/assets/icons/reviewIcons/deliciousIcon.svg"
          fill
          alt="맛있어요"
        />
      </div>
      <p className="mt-1.5 ml-1 text-xs mob:text-sm  ">&quot;{tag}&quot;</p>
    </div>
  );
};

const Component2 = ({ tag }) => {
  return (
    <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
      <div className="relative w-6 h-6 ml-1">
        <Image
          src="/assets/icons/reviewIcons/freshIcon.svg"
          fill
          alt="신선해요"
        />
      </div>
      <p className="mt-1.5 ml-1 text-xs mob:text-sm  ">&quot;{tag}&quot;</p>
    </div>
  );
};
const Component3 = ({ tag }) => {
  return (
    <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
      <div className="relative w-6 h-6 ml-1">
        <Image
          src="/assets/icons/reviewIcons/toomuchIcon.svg"
          fill
          alt="양이 많아요"
        />
      </div>
      <p className="mt-1.5 ml-1 text-xs mob:text-sm  ">&quot;{tag}&quot;</p>
    </div>
  );
};
const Component4 = ({ tag }) => {
  return (
    <div className="bg-itembg flex flex-row rounded-lg mr-4 mb-2 p-1">
      <div className="relative w-6 h-6 ml-1">
        <Image
          src="/assets/icons/reviewIcons/kindIcon.svg"
          fill
          alt="친절해요"
        />
      </div>
      <p className="mt-1.5 ml-1 text-xs mob:text-sm  ">&quot;{tag}&quot;</p>
    </div>
  );
};

export default ReviewTag;
