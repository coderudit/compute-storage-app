const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { writeFile } = require("fs");
const { uploadRobData } = require("./s3");

const beginRequest = async () => {
  const data = {
    banner: "B00889579",
    ip: "3.224.52.7",
  };
  try {
    let response = await axios.post("http://3.88.132.229:80/begin", data, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

const storeDataInS3 = async (req, res) => {
  let s3_dataLocation;
  try {
    const { data } = req.body;
    //console.log(data);
    console.log("Data ==========" + data);
    createFileWithRobData(data);
    console.log("File created.");

    const file = {
      path: "./files/rob.txt",
      filename: "rob.txt",
    };

    s3_dataLocation = await uploadRobData(file);
    console.log("Location:" + s3_dataLocation);
  } catch (err) {
    console.error(err);
  }
  return res.status(StatusCodes.OK).send({ s3uri: s3_dataLocation.Location });
};

const createFileWithRobData = async (data) => {
  await writeFile("./files/rob.txt", data, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
};

module.exports = { beginRequest, storeDataInS3 };
