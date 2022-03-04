const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const { writeFile } = require("fs");
const { uploadRobData } = require("./s3");

const beginRequest = async () => {
  const data = {
    banner: "B00889579",
    ip: "127.0.0.1",
  };
  try {
    let response = await axios.post("http://localhost:8000/begin", data, {
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
  try {
    const { data } = req.body;
    console.log(data);

    createFileWithRobData(data);

    const file = {
      path: "./files/rob.txt",
      filename: "rob.txt",
    };

    let s3_dataLocation = uploadRobData(file);
  } catch (err) {
    console.error(err);
  }
  return res.status(StatusCodes.OK).send({ s3_uri: s3_dataLocation });
};

const createFileWithRobData = async (data) => {
  await writeFile("./files/rob.txt", data, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    //console.log(result);
  });
};

module.exports = { beginRequest, storeDataInS3 };
