import { getSignedUploadURL } from '../controllers/s3.controller.js';
import { verifyAccessToken, verifyAdmin } from '../middleware/verify.js';

export default (express, app) => {
    const router = express.Router();

    // Get a signed URL which we can use to upload an image to our S3 bucket.
    // Only admin users can access this route.
    router.get('/', [verifyAccessToken, verifyAdmin], getSignedUploadURL);

    // Add routes to server.
    app.use('/s3', router);
};
