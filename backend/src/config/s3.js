import aws from 'aws-sdk';

const s3Configs = {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
};

// Create S3 service object
export default new aws.S3(s3Configs);
