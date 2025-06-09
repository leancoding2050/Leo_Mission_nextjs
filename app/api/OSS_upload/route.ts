// import formidable from 'formidable';
// import  ossClient  from '@/lib/oss';

// export const config = {
//   api: {
//     bodyParser: false, // 禁用默认的 bodyParser，以便處理文件流
//   },
// };

// export default async function handler(req:any, res:any) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const form = new formidable.IncomingForm();
//   form.parse(req, async (err, fields, files:any) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error parsing file' });
//     }

//     const file = files.file; // 假設前端上傳的文件字段名為 "file"
//     const filePath = file.filepath; // formidable 提供的臨時文件路徑
//     const fileName = file.originalFilename; // 原文件名

//     try {
//       // 上傳文件到 OSS
//       const result = await ossClient.put(`uploads/${fileName}`, filePath);
//       return res.status(200).json({
//         message: 'Upload successful',
//         url: result.url, // 返回文件在 OSS 上的 URL
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Upload failed' });
//     }
//   });
// }