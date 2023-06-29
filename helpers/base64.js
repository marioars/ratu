import imageToBase64 from "image-to-base64/browser";

const convertImage = async (pathFile) => {
  const hasilConvert = await imageToBase64(pathFile);
  return hasilConvert;
};

export default convertImage;
