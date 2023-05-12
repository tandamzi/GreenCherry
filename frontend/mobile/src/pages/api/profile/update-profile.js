import fs from 'fs';
import path from 'path';

import FormData from 'form-data';
import { IncomingForm } from 'formidable';

import createHttpInstance from '@/utils/csr/backendhttp';

// 이 API 라우트에 multer 미들웨어를 사용합니다.
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const form = new IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to parse the request' });
      return;
    }
    const formData = new FormData();

    const images = Array.isArray(files.images) ? files.images : [files.images];

    images.forEach(file => {
      const ext = path.extname(file.Original); // 확장자 추출
      formData.append(
        'images',
        fs.createReadStream(file.Path),
        file.name + ext,
      );
    });

    // const file = files.profileImg.PersistentFile;
    // const ext = path.extname(file.originalFilename); // 확장자 추출
    // formData.append(
    //   'images',
    //   fs.createReadStream(file.filepath),
    //   file.name + ext,
    // );

    try {
      const httpInstance = createHttpInstance(req);
      const response = await httpInstance.post('/store', formData, {
        headers: formData.getHeaders(),
      });

      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to upload files' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  });
};
export default handler;
