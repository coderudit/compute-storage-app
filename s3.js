require("dotenv").config();

const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = "compute-storage-bucket"; //process.env.AWS_BUCKET_NAME;
const region = "ca-central-1"; //process.env.AWS_REGION;
const accessKeyId = "AKIAXKBPMQVLT3AF5D7X"; //process.env.AWS_ACCESS_KEY;
const secretAccessKey = "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"; //process.env.AWS_SECRET_ACCESS;

const s3_Instance = new S3({ region, accessKeyId, secretAccessKey });

//Upload Rob's file to S3.
const uploadRobData = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  let s3_dataLocation;

  s3_dataLocation = await s3_Instance
    .upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
        s3_dataLocation = data.Location;
      }
    })
    .promise();

  console.log(s3_dataLocation);

  return s3_dataLocation;
};

module.exports = { uploadRobData };
