import fs from 'fs'
import multer from 'multer'

export class Multer {

  storage: multer.StorageEngine
  constructor(private dir: string, private isSameFileName: boolean) {

    this.storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        const directory = `public/image`
        fs.mkdirSync(directory, { recursive: true })
        cb(null, directory)
      },
      filename: (req, file, cb) => {
        const file_name = file?.originalname.replace(/\s+/g, '-').split('.').shift();
        const file_extension = file?.originalname.split('.').pop();
        const epoch_time = new Date().getTime();
        const file_name_with_extension = `${file_name}_${epoch_time}.${file_extension}`;
        return cb(null, file_name_with_extension)
      },
    })
  }

  get upload() {
    return multer({ storage: this.storage }).single('file');
  }
  
}