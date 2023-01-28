import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/")
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    }
})
const checkFileType = (file, cb) => {
    const file_types = /jpg|jpeg|png/
    const ext_Name = file_types.test(
		path.extname(file.originalname).toLocaleLowerCase()
	)
    const mime_types = file_types.test(file.mime_types)
    if (ext_Name && mime_types) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})
router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})

export default router