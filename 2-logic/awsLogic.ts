import { s3bucket } from "../1-dal/aws";

export async function saveImagesToS3(file: any, imageId: string) {
    try {
        const type = file.productImage.name.split('.')[1];
        const params = {
            Body: file.productImage.data,
            Key: `${imageId}.${type}`,
            Bucket: 'reusfulimages'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}
export async function saveProductImagesToS3(files: any, imageId: string) {
    try {
        const type = files.name.split('.')[1];
        const params = {
            Body: files.data,
            Key: `${imageId}.${type}`,
            Bucket: 'reusfulimages'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}


export async function saveImagesToS3Cat(file: any, imageId: string) {
    try {
        const type = file.categoriesImage.name.split('.')[1];
        const params = {
            Body: file.categoriesImage.data,
            Key: `${imageId}.${type}`,
            Bucket: 'reusfulimages'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}
export async function saveImagesToS3User(file: any, imageId: string) {
    try {
        const type = file.name.split('.')[1];
        const params = {
            Body: file.data,
            Key: `${imageId}.${type}`,
            Bucket: 'reusfulimages'
        }
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}

export async function deleteImageFromS3(imageId: string) {
    const params = { Bucket: 'reusfulimages', Key: imageId };
    try {
        const results = await s3bucket.deleteObject(params).promise();
        return results
    } catch (e) {
        console.log(e);

    }
}