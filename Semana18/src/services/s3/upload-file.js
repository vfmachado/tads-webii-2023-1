const AWS = require('aws-sdk');
const fs = require('fs');

const uploadFileToS3 = async (filename) => {

    const s3Client = new AWS.S3({
        // id da chave
        accessKeyId: 'AWS KEY ID',

        // secret
        secretAccessKey: 'AWS SECRET',

        // regiao onde esta o bucket
        region: 'us-east-1'
    });

    const fileData = fs.readFileSync('public/users/' + filename);

    const params = {
        // nome da "pasta" do s3
        Bucket: 'tads-2022-webii',

        // identificador do arquivo
        Key: filename,

        // dado de fato
        Body: fileData
    }

    const result = await s3Client.upload(params).promise();
    return result;
};

module.exports = { uploadFileToS3 };
