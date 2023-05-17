/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';

import FormData from 'form-data';
import { IncomingForm } from 'formidable';

import createHttpInstance from '@/utils/csr/backendhttp';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Only POST method allowed' });
    return;
  }

  const form = new IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to parse the request' });
      return;
    }
    const formData = new FormData();
    const responseData = JSON.parse(fields.data);

    const registerStoreRequestDto = {
      memberId: responseData.memberId,
      storeId: responseData.storeId,
      orderId: responseData.orderId,
      tags: responseData.tags,
      content: responseData.content,
    };

    const json = JSON.stringify(registerStoreRequestDto);
    formData.append('reviewRegisterRequestDto', json, {
      contentType: 'application/json',
      filename: 'reviewRegisterRequestDto.json',
    });

    for (const image of Object.values(files)) {
      const images = Array.isArray(image) ? image : [image];
      images.forEach(file => {
        // console.log(file);
        const filePath = typeof file === 'string' ? file : file.filepath;
        formData.append(
          'images',
          fs.createReadStream(filePath),
          file.originalFilename,
        );
      });
    }

    // console.log(formData)
    try {
      const httpInstance = createHttpInstance(req);
      const response = await httpInstance.post('/review', formData, {
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
}
