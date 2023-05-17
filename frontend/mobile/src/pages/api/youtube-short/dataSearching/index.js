// // 필요한 모듈을 불러옵니다.
// import { StatusCodes } from 'http-status-codes';

// import createYoutubeIntstacne from '@/utils/youtube';

// const fs = require('fs');

// // 비디오 ID를 기반으로 YouTube 비디오 정보를 가져오는 함수를 정의합니다.

// const handler = async (req, res) => {
//   const youtube = createYoutubeIntstacne();
//   const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
// };

// export default handler;

// async function getVideoInfo(videoId) {
//   const youtube = createYoutubeIntstacne();
//   const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
//   try {
//     // YouTube Data API에 요청을 보냅니다.
//     await youtube
//       .get(`videos/part=snippet&key=${API_KEY}&id=${videoId}`)
//       .then(response => {
//         console.log(response)
//         // API 응답에서 필요한 정보를 추출합니다.
//         const video = response.data.items[0];
//         const title = video.snippet.title;
//         const description = video.snippet.description;
//         const channelTitle = video.snippet.channelTitle;
//       });

//     // 결과를 반환합니다.
//     return {
//       title,
//       description,
//       channelTitle,
//     };
//   } catch (error) {
//     console.error('Error fetching video information:', error);
//     throw error;
//   }
// }

// // 검색할 비디오 ID 목록을 입력하세요.
// const videoIds = ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3'];

// // 비디오 정보를 검색하고 JSON 파일로 저장하는 함수를 정의합니다.
// async function searchAndSaveVideoInfo(videoIds) {
//   for (const videoId of videoIds) {
//     try {
//       // 비디오 정보를 가져옵니다.
//       const videoInfo = await getVideoInfo(videoId);

//       // JSON 파일로 비디오 정보를 저장합니다.
//       const data = JSON.stringify(videoInfo, null, 2);
//       fs.writeFileSync(`video_info_${videoId}.json`, data);
//       console.log(
//         `Video information for ${videoId} saved to video_info_${videoId}.json.`,
//       );
//     } catch (error) {
//       console.error(`Error fetching video information for ${videoId}:`, error);
//     }
//   }
// }

// // 검색하고자 하는 비디오 정보를 검색하고 저장합니다.
// searchAndSaveVideoInfo(videoIds);
