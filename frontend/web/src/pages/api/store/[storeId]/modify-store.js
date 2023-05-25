import fs from 'fs';
import path from 'path';

import FormData from 'form-data';
import { IncomingForm } from 'formidable';

import createHttpInstance from '@/utils/http';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  const {
    query: { storeId },
  } = req;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to parse the request' });
      return;
    }

    const formData = new FormData();
    const responseData = fields;

    const fieldMap = {
      storeDescription: responseData.storeDescription,
      snsAccount: responseData.instagram,
      pickUpStartTime: responseData.pickUpStartTime,
      pickUpEndTime: responseData.pickUpEndTime,
      cherryBoxDescription: responseData.cherryBoxDescription,
      allergyIdList: responseData.allergies,
    };

    const storeRequestDto = {};

    Object.keys(fieldMap).forEach(field => {
      if (fieldMap[field] !== undefined) {
        storeRequestDto[field] = fieldMap[field];
      }
    });

    const json = JSON.stringify(storeRequestDto);

    formData.append('storeRequestDto', json, {
      contentType: 'application/json',
      filename: 'storeRequestDto.json',
    });

    if (files.images !== undefined) {
      const images = Array.isArray(files.images)
        ? files.images
        : [files.images];

      images.forEach(file => {
        const ext = path.extname(file.originalFilename); // 확장자 추출
        formData.append(
          'images',
          fs.createReadStream(file.filepath),
          file.name + ext,
        );
      });
    }

    try {
      const http = createHttpInstance(req);
      const response = await http.put(`/store/${storeId}`, formData, {
        headers: formData.getHeaders(),
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  });
}
