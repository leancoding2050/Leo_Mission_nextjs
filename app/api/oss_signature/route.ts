// import { NextResponse } from 'next/server';
// import OSS from 'ali-oss';

// export async function GET() {
//   // 檢查環境變量
//   const {
//     ALI_OSS_REGION,
//     ALI_OSS_ACCESS_KEY_ID,
//     ALI_OSS_ACCESS_KEY_SECRET,
//     ALI_OSS_BUCKET,
//     ALI_OSS_ENDPOINT,
//   } = process.env;

//   if (
//     !ALI_OSS_REGION ||
//     !ALI_OSS_ACCESS_KEY_ID ||
//     !ALI_OSS_ACCESS_KEY_SECRET ||
//     !ALI_OSS_BUCKET ||
//     !ALI_OSS_ENDPOINT
//   ) {
//     return NextResponse.json({ error: '缺少必要的 OSS 環境變量' }, { status: 500 });
//   }

//   try {
//     const client = new OSS({
//       region: ALI_OSS_REGION,
//       accessKeyId: ALI_OSS_ACCESS_KEY_ID,
//       accessKeySecret: ALI_OSS_ACCESS_KEY_SECRET,
//       bucket: ALI_OSS_BUCKET,
//       secure: true,
//     });

//     const policy = {
//       expiration: new Date(Date.now() + 3600 * 1000).toISOString(), // 簽名有效期 1 小時
//       conditions: [{ bucket: ALI_OSS_BUCKET }, ['starts-with', '$key', 'Uploads/']],
//     };

//     const policyBase64 = Buffer.from(JSON.stringify(policy)).toString('base64');
//     const signature = client.calculatePostSignature(policy);

//     return NextResponse.json({
//       accessId: ALI_OSS_ACCESS_KEY_ID,
//       policy: policyBase64,
//       signature,
//       host: `https://${ALI_OSS_BUCKET}.${ALI_OSS_ENDPOINT}`,
//       dir: 'Uploads/',
//     });
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : '未知錯誤';
//     console.error('OSS 簽名生成失敗:', error);
//     return NextResponse.json({ error: `簽名生成失敗: ${errorMessage}` }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import OSS from 'ali-oss';

// export async function GET() {
//   const {
//     ALI_OSS_REGION,
//     ALI_OSS_ACCESS_KEY_ID,
//     ALI_OSS_ACCESS_KEY_SECRET,
//     ALI_OSS_BUCKET,
//     ALI_OSS_ENDPOINT,
//   } = process.env;

//   if (
//     !ALI_OSS_REGION ||
//     !ALI_OSS_ACCESS_KEY_ID ||
//     !ALI_OSS_ACCESS_KEY_SECRET ||
//     !ALI_OSS_BUCKET ||
//     !ALI_OSS_ENDPOINT
//   ) {
//     console.error('Missing OSS environment variables:', {
//       ALI_OSS_REGION,
//       ALI_OSS_ACCESS_KEY_ID,
//       ALI_OSS_BUCKET,
//       ALI_OSS_ENDPOINT,
//     });
//     return NextResponse.json({ error: '缺少必要的 OSS 環境變量' }, { status: 500 });
//   }

//   try {
//     const client = new OSS({
//       region: ALI_OSS_REGION,
//       accessKeyId: ALI_OSS_ACCESS_KEY_ID,
//       accessKeySecret: ALI_OSS_ACCESS_KEY_SECRET,
//       bucket: ALI_OSS_BUCKET,
//       // secure: true,
//     });

//     const policy = {
//       expiration: new Date(Date.now() + 3600 * 1000).toISOString(),
//       conditions: [{ bucket: ALI_OSS_BUCKET }, ['starts-with', '$key', 'Uploads/']],
//     };

//     const policyBase64 = Buffer.from(JSON.stringify(policy)).toString('base64');
//     const { Signature } = client.calculatePostSignature(policy); // 確保提取字符串
//     console.log('Policy Base64:', policyBase64);
//     console.log('Generated Signature:', Signature);

//     return NextResponse.json({
//       accessId: ALI_OSS_ACCESS_KEY_ID,
//       policy: policyBase64,
//       Signature,
//       host: `https://${ALI_OSS_BUCKET}.${ALI_OSS_ENDPOINT}`,
//       dir: 'uploads/',
//     });
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : '未知錯誤';
//     console.error('OSS 簽名生成失敗:', error);
//     return NextResponse.json({ error: `簽名生成失敗: ${errorMessage}` }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const {
    ALI_OSS_REGION,
    ALI_OSS_ACCESS_KEY_ID,
    ALI_OSS_ACCESS_KEY_SECRET,
    ALI_OSS_BUCKET,
    ALI_OSS_ENDPOINT,
  } = process.env;

  if (
    !ALI_OSS_REGION ||
    !ALI_OSS_ACCESS_KEY_ID ||
    !ALI_OSS_ACCESS_KEY_SECRET ||
    !ALI_OSS_BUCKET ||
    !ALI_OSS_ENDPOINT
  ) {
    console.error('Missing OSS environment variables:', {
      ALI_OSS_REGION,
      ALI_OSS_ACCESS_KEY_ID,
      ALI_OSS_BUCKET,
      ALI_OSS_ENDPOINT,
    });
    return NextResponse.json({ error: '缺少必要的 OSS 環境變量' }, { status: 500 });
  }

  try {
    const policy = {
      expiration: new Date(Date.now() + 3600 * 1000).toISOString(),
      conditions: [
        ["content-length-range", 0, 104857600], // 與客戶端一致
        ["starts-with", "$key", "uploads/"], // 統一為小寫 u
        { bucket: ALI_OSS_BUCKET },
      ],
    };

    const policyBase64 = Buffer.from(JSON.stringify(policy)).toString('base64');
    const signature = crypto
      .createHmac('sha1', ALI_OSS_ACCESS_KEY_SECRET)
      .update(policyBase64)
      .digest('base64');

    console.log('Policy:', JSON.stringify(policy));
    console.log('Policy Base64:', policyBase64);
    console.log('Generated Signature:', signature);

    return NextResponse.json({
      accessId: ALI_OSS_ACCESS_KEY_ID,
      policy: policyBase64,
      signature,
      host: `https://${ALI_OSS_BUCKET}.${ALI_OSS_ENDPOINT}`,
      dir: 'uploads/', // 統一為小寫 u
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知錯誤';
    console.error('OSS 簽名生成失敗:', error);
    return NextResponse.json({ error: `簽名生成失敗: ${errorMessage}` }, { status: 500 });
  }
}