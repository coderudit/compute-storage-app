require("dotenv").config();

const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS;

const s3_Instance = new S3({ region, accessKeyId, secretAccessKey });

//Upload Rob's file to S3.
const uploadRobData = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  let s3_dataLocation;

  s3_dataLocation = s3_Instance.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
      s3_dataLocation = data.Location;
    }
  });

  return s3_dataLocation;
};

module.exports = { uploadRobData };
