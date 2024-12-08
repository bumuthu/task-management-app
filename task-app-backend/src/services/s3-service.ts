import * as aws from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ConfigProvider from "../config/config-provider";

export class S3Service {
    private s3: aws.S3;

    constructor() {
        this.s3 = this.createS3Object();
    }

    private createS3Object() {
        return new aws.S3({
            region: ConfigProvider.get('AWS_REGION') as string,
            credentials: {
                accessKeyId: ConfigProvider.get('AWS_ACCESS_KEY') as string,
                secretAccessKey: ConfigProvider.get('AWS_SECRET_KEY') as string
            }
        })
    }

    async getPreSignedUrl(id: string) {
        return await getSignedUrl(this.s3, new aws.PutObjectCommand({
            Bucket: ConfigProvider.get('TASK_FILE_BUCKET') as string,
            Key: id
        }));
    }

    async deleteFile(id: string) {
        await this.s3.deleteObject({
            Bucket: ConfigProvider.get('TASK_FILE_BUCKET') as string,
            Key: id
        })
    }
}