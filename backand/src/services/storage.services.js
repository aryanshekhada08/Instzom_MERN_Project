const imagekit = require("imagekit");

const ik = new imagekit({   
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
}); 
async function uploadfile(file, fileName){
    const result  = await ik.upload({
        file: file,
        fileName: fileName,
    });
    return result;
}

module.exports = {
    uploadfile,
}