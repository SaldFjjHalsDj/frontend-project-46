const parser = {
  json: JSON.parse,
};

export default (filepath, ext) => {
  try {
    return parser[ext](filepath);
  } catch (error) {
    throw new Error(`Unknown extention format: ${ext}`);
  }
};
