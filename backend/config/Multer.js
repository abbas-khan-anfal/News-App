import multer from "multer";

// create diskstorage for users
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// create diskstorage for posts
const postStorage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, "uploads/posts/");
  },
  filename : (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

// create upload
const userUpload = multer({ storage: userStorage });
const postUpload = multer({ storage : postStorage});

export { userUpload, postUpload }
