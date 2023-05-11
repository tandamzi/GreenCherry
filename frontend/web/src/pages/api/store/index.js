import axios from 'axios';
import multer from 'multer';

import { createHttpFormInstance } from '@/utils/http';

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload.array('images')(async function handler(req, res) {
  if (req.method === 'POST') {
    const responseData = JSON.parse(req.body.data);
    const data = {
      name: responseData.name,
      memberId: responseData.memberId,
      typeId: responseData.typeId,
      address: {
        addressName: responseData.addressName,
        detaillAddressName: responseData.detailAddress,
        lat: responseData.lat,
        lng: responseData.lng,
      },
      phone: responseData.phone,
    };
    const { files } = req;

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file.buffer, file.originalname);
    });
    formData.append('data', JSON.stringify(data));

    try {
      const response = await createHttpFormInstance().post('/store', formData);

      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to upload files' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload files' });
    }
  } else {
    res.status(400).json({ error: 'Only POST method allowed' });
  }
});
