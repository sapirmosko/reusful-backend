import AWS from 'aws-sdk';

export const s3bucket = new AWS.S3({
    accessKeyId: '',
    secretAccessKey: '',
});