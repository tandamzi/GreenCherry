import { StatusCodes } from 'http-status-codes';

import createYoutubeIntstacne from '@/utils/youtube';

const handler = async (req, res) => {
  const youtube = createYoutubeIntstacne();
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  await youtube
    .get(
      `search?part=snippet&type=short&key=${API_KEY}&q=toogoodtogo&maxResults=0&order=date`,
    )
    .then(response => {
      res.status(StatusCodes.OK).json(response.data);
    });
};

export default handler;
