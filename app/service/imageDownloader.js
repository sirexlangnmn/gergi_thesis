const fs = require('fs');
const https = require('https');
const path = require('path');


function extractImage(resourceName, imageUrl) {
    const folderPath = path.join(__dirname, '../../', 'public/uploads/gergi/resources_image/');
    const filePath = path.join(folderPath, resourceName);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Download and save the image
    https.get(imageUrl, (response) => {
        if (response.statusCode === 200) {
            const fileStream = fs.createWriteStream(filePath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Image downloaded successfully: ${filePath}`);
            });
        } else {
            console.error(`Failed to download image. Status Code: ${response.statusCode}`);
        }
    }).on('error', (err) => {
        console.error('Error downloading image:', err.message);
    });
}


module.exports = {
    extractImage
};