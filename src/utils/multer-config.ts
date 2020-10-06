import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const { userId } = req.params;
    cb(null, userId ? `${userId}-${file.originalname}` : file.originalname);
  },
});

export const upload = multer({
  storage,
});
