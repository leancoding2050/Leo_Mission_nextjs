import  ossClient  from '@/lib/oss';

export default async function handler(req:any, res:any) {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const fileName = req.query.fileName || 'uploads/example.txt';
  
    try {
      // 生成簽名 URL，有效期 1 小時
      const url = ossClient.signatureUrl(fileName, { expires: 3600 });
      return res.status(200).json({ url });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to generate URL' });
    }
  }