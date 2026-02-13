import multer from "multer";
import path from "path";
import fs from "fs";
 
const uploadDir = "uploads";
 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
 
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
 
const upload = multer({ storage });
 
export const uploadLoanDocs = upload.fields([
  { name: "proof", maxCount: 1 },
]);