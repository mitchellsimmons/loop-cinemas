import crypto from 'crypto';

import s3 from '../config/s3.js';

// Generate a signed URL that can be used to upload an image to the s3 bucket
// GET route: /api/s3
export const getSignedUploadURL = async (req, res) => {
    const imageName = crypto.randomBytes(16).toString('hex');

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Expires: 60,
    };

    const url = s3.getSignedUrl('putObject', params);
    res.json({ url, imageName });
};
