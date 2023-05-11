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

    // Create the registerStoreRequestDto object
    const registerStoreRequestDto = {
      name: responseData.name,
      memberId: responseData.memberId,
      typeId: responseData.typeId,
      address: {
        addressName: responseData.address,
        detailAddressName: responseData.detailAddress,
        lat: responseData.lat,
        lng: responseData.lng,
      },
      phone: responseData.phone,
      pickUpStartTime: responseData.pickUpStartTime,
      pickUpEndTime: responseData.pickUpEndTime,
      allergyIdList: responseData.allergyIdList,
    };

    const json = JSON.stringify(registerStoreRequestDto);
    formData.append('registerStoreRequestDto', json, {
      contentType: 'application/json',
      filename: 'registerStoreRequestDto.json',
    });

    const images = Array.isArray(files.images) ? files.images : [files.images];
    images.forEach(file => {
      const ext = path.extname(file.originalFilename); // 확장자 추출
      formData.append(
        'images',
        fs.createReadStream(file.filepath),
        file.name + ext,
      );
    });

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
}
