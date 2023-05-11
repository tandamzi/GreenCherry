import fs from 'fs';

import FormData from 'form-data';
import { IncomingForm } from 'formidable';

import createHttpInstance, { createHttpFormInstance } from '@/utils/http';

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

  form.parse(req, async (err, fields, files) => {
    // console.log(files.images);
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
        addressName: responseData.addressName,
        detailAddressName: responseData.detailAddress,
        lat: responseData.lat,
        lng: responseData.lng,
      },
      phone: responseData.phone,
    };

    formData.append(
      'registerStoreRequestDto',
      JSON.stringify(registerStoreRequestDto),
    );

    // 'files.images' is an array
    if (Array.isArray(files.images)) {
      files.images.forEach(file => {
        // console.log(`File path: ${file.filepath}`); // Log the file path
        formData.append(
          'images',
          fs.createReadStream(file.filepath),
          file.name,
        );
      });
    } else {
      // 'files.images' is not an array
      // console.log(`File path: ${files.images.filepath}`); // Log the file path
      formData.append(
        'images',
        fs.createReadStream(files.images.filepath),
        files.images.name,
      );
    }

    try {
      const httpFormInstance = createHttpFormInstance(req);
      const response = await httpFormInstance.post('/store', formData, {
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

/* export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to upload files' });
        return;
      }

      const responseData = JSON.parse(fields.data);
      const registerStoreRequestDto = {
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

      const formData = new FormData();

      if (Array.isArray(files.images)) {
        files.images.forEach(file => {
          formData.append('images', fs.createReadStream(file.path), file.name);
        });
      } else {
        formData.append(
          'images',
          fs.createReadStream(files.images.path),
          files.images.name,
        );
      }

      formData.append(
        'registerStoreRequestDto',
        JSON.stringify(registerStoreRequestDto),
      );

      try {
        const response = await createHttpFormInstance().post(
          '/store',
          formData,
        );

        if (response.status === 200) {
          res.status(200).json({ success: true });
        } else {
          res.status(500).json({ error: 'Failed to upload files' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to upload files' });
      }
    });
  } else {
    res.status(400).json({ error: 'Only POST method allowed' });
  }
} */

/* import axios from 'axios';
import multer from 'multer';

import { createHttpFormInstance } from '@/utils/http';

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload.array('images')(async function handler(req, res) {
  console.log(req.files);
  console.log(req.body.data);
  if (req.method === 'POST') {
    const responseData = JSON.parse(req.body.data);
    console.log(responseData);
    const registerStoreRequestDto = {
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
    formData.append(
      'registerStoreRequestDto',
      JSON.stringify(registerStoreRequestDto),
    );
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    try {
      const response = await createHttpFormInstance().post('/store', formData);
      console.log(response);
      if (response.status === 200) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ error: 'Failed to upload files' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  } else {
    res.status(400).json({ error: 'Only POST method allowed' });
  }
});
 */
