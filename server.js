const express = require("express");
const cors = require("cors");
const multer = require("multer");
const formidable = require("formidable");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use(cors());
app.listen(PORT, () => console.log(`server running on ${PORT}`));
// app.get('/',(req,res) => res.send('hello'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});
