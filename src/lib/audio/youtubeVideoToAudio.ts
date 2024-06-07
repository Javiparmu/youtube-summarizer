import { v2 as cloudinary } from 'cloudinary';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ensureDirectoryExistence = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const downloadAudio = async (url: string, outputPath: string) => {
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, { filter: 'audioonly' })
      .pipe(fs.createWriteStream(outputPath));
    
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', (error) => reject(error));
  });
};

const uploadToCloudinary = async (filePath: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, { resource_type: 'video' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result?.secure_url);
      }
    });
  });
};

export const youtubeVideoToAudio = async (url: string) => {
  const audioName = `${crypto.getRandomValues(new Uint32Array(1))[0]}.mp3`;
  const outputDir = path.join(process.cwd(), 'public', 'youtube-audio');
  const outputPath = process.env.NODE_ENV === 'test' ? path.join(outputDir, audioName) : `/tmp/${audioName}`;

  try {
    ensureDirectoryExistence(outputDir);

    await downloadAudio(url, outputPath);
    
    // const audioUrl = await uploadToCloudinary(outputPath);
    return outputPath;
  } catch (error) {
    console.error('Error during processing:', error);
    throw error;
  }
};

export const summarizeVideo = async (url: string) => {
  try {
    const audioUrl = await youtubeVideoToAudio(url);
    return audioUrl;
  } catch (error) {
    console.error('Error summarizing video:', error);
    throw error;
  }
};
