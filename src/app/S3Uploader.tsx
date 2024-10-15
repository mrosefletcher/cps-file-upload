import {
    S3Client,
    PutObjectCommand,
    GetObjectCommandOutput,
  } from "@aws-sdk/client-s3";
import { FetchHttpHandler } from "@smithy/fetch-http-handler";

  //https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/cors.html

const s3Client = new S3Client({ region: 'us-west-2', 
    requestHandler: new FetchHttpHandler({ keepAlive: false })
});
const BUCKET = "cps-web-server-target";

export default async function UploadToS3(file: File | null, dir:string): Promise<GetObjectCommandOutput> {
    var fileContents = null;
    var uploadName = "";
    if (file) {
        try{
            uploadName = file.name;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                fileContents = fileReader.result as string;
            };
        }catch(e){
            console.log("in s3Uploader:");
            console.log(e);
        }
    } else { return Promise.reject("Someone clicked submit without choosing a file"); };

    return await s3Client.send(
        new PutObjectCommand({
            Bucket: BUCKET,
            Key: `${dir}/${uploadName}`,
            Body: `${fileContents}`,
        }));
};