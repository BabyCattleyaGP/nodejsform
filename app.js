const http = require("http");
//module filestream
const fs = require("fs");
//module path
const path = require('path');
//module express js
const express = require('express');
//module hbs untuk view
const hbs = require('hbs');
//module body parser
const bodyParser = require('body-parser');
//module mutler
const multer = require("multer");


const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8000;

httpServer.listen(8000, () => {
  console.log(`Server berjalan di ${PORT}`);
});

//folder views menyimpan file view (html)
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');

//set folder public sebagai folder yang berisi static file (css js)
app.use(express.static('public'));

app.get('/',(req, res) => {
    //render file (home)
    res.render('input');
  });

app.get("/image.png", (req, res) => {
    res.sendFile(path.join(__dirname, "./uploads/image.png"));
});


//error handling
const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Error! Coba Lagi");
};

const upload = multer({
  dest: "/public"
});


app.post(
  "/upload",
  upload.single("file" /*nama atribut di form*/),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png"); //simpan gambar di sana

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .render('tampil',{
            //ambil value dari textname
            name : req.body.name,
            npm : req.body.npm,
            email : req.body.email
        });

        app.get("/image.png", (req, res) => {
            res.sendFile(path.join(__dirname, "./uploads/image.png"));  //tampil gambar di view
          });

      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Hanya file .png!");
      });
    }
  }
);