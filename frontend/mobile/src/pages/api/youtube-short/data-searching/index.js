/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
// 필요한 모듈을 불러옵니다.
import { StatusCodes } from 'http-status-codes';

import createYoutubeIntstacne from '@/utils/youtube';

const fs = require('fs');

const getVideoInfo = async videoId => {
  const youtube = createYoutubeIntstacne();
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  try {
    const response = await youtube.get('/videos', {
      params: {
        key: API_KEY,
        part: 'snippet',
        id: videoId,
      },
    });

    const video = response.data.items[0];
    const { title } = video.snippet;
    const { description } = video.snippet;
    const { channelTitle } = video.snippet;

    return {
      videoId,
      title,
      description,
      channelTitle,
    };
  } catch (error) {
    console.error('Error fetching video information:', error);
    throw error;
  }
};

// 비디오 정보를 검색하고 JSON 파일로 저장하는 함수를 정의합니다.

const searchAndSaveVideoInfo = async videoIds => {
  try {
    // 비디오 정보를 저장할 배열을 선언합니다.
    const videoInfoList = [];

    // 비디오 정보를 검색합니다.
    for (const videoId of videoIds) {
      const videoInfo = await getVideoInfo(videoId);
      videoInfoList.push(videoInfo);
    }

    // JSON 파일로 비디오 정보를 저장합니다.
    const data = JSON.stringify(videoInfoList, null, 2);
    fs.writeFileSync('shortDb.json', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handler = async (req, res) => {
  const videoIds = [
    'OLHmy0ZdWyY',
    'CFzbz7y_WSQ',
    '7aQFot1gb0Y',
    'mcXX2xMIgqA',
    'mx4PVvJEvmI',
    'Ap3bl2vb2Cg',
    '55uv3jOJrRg',
    'CJyk5nwPyXc',
    'LlvvSq6ZV4c',
    'mQSzanMZJ7c',
    'gFEwfS-WP0U',
    'e7FRqDxrq1I',
  ];
  await searchAndSaveVideoInfo(videoIds);
};

export default handler;
