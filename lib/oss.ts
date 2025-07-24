import OSS from 'ali-oss';

// 检查环境变量是否存在并提供默认值或抛出错误
function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
  }
  
  const client = new OSS({
    region: getEnvVar('OSS_region'),
    accessKeyId: getEnvVar('OSS_AccessKey_ID'),
    accessKeySecret: getEnvVar('OSS_AccessKey_Secret'),
    bucket: getEnvVar('OSS_bucket_name'),
    endpoint: getEnvVar('OSS_bucket_endpoint')
  });

  export default client;