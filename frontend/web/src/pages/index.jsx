import React, { useEffect, CSSProperties, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '@/components/Container';
import Section1 from '@/components/LandingPageComponent/Section1';
import Section2 from '@/components/LandingPageComponent/Section2';
import Section3 from '@/components/LandingPageComponent/Section3';
import Section4 from '@/components/LandingPageComponent/Section4';
import useMember from '@/hooks/memberHook';

export default function Home() {
  const router = useRouter();
  const { memberAttributes } = useMember();
  useEffect(() => {
    if (memberAttributes && memberAttributes.storeId) {
      router.push('/business');
    }
  }, []);
  return (
    <Container>
      <Container.MainHeader />
      <Container.PaddingZeroBody className="bg-secondary block text-bgcolor">
        <div className="h-screen w-full overflow-x-hidden overflow-y-scroll snap-y snap-mandatory">
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </div>
      </Container.PaddingZeroBody>
    </Container>
  );
}
