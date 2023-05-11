/* eslint-disable no-param-reassign */
import axios from 'axios';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
export default function createYoutubeIntstacne() {
  const youtubeAPI = axios.create({
    baseURL: YOUTUBE_API_URL,
  });

  return youtubeAPI;
}
