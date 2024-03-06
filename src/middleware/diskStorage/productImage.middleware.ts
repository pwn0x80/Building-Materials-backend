import multer, { Multer } from "multer";
import { env } from "process";
import { Request,Response,NextFunction } from 'express'

const storage = multer.diskStorage({
  destination: function(req:Request, file:Express.Multer.File, cb) {
    cb(null, process.env.publicloc+"/img/items")
  },
  filename: function(req, file:Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).array('itemImg', 10)

export const uploadProductImage = (req: Request, res: Response, next:NextFunction) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    next()
  })
}
