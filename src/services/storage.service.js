const ImageKit =  require('@imagekit/nodejs');

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

const uploadFile =  async(file)=>{
    const result = await ImageKitClient.files.upload({
       file,
    fileName: "music_" + Date.now(),
    folder: "spotify/music"
    })

    return result;
}

module.exports = {uploadFile};

