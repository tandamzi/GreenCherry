import createHttpInstance from '@/utils/http';

export default async function handler(req, res) {
  const { storeId } = req.query;
  try {
    const http = createHttpInstance(req);
    const response = await http.get(`/store/info?store-id=${storeId}`);
    const data = {
      storeDescription: response.data.data.description || '',
      instagram: response.data.data.snsAccount || '',
      pickUpStartTime: response.data.data.pickUpStartTime,
      pickUpEndTime: response.data.data.pickUpEndTime,
      cherryboxDescription: response.data.data.cherryBox.description || '',
      allergies: response.data.data.allergies,
      images: response.data.data.images,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
