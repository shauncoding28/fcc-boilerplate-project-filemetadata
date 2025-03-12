var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// set uploads directory as target for storage, or automatically creates one if it doesn't exist
const upload = multer({ dest: 'uploads/' });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// multer handles file uploads and them available through req.file, upfile is the name of the input field in the html document
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  //verifies file exists
  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  //constructs response object
  const fileName = file.originalname;
  const fileType = file.mimetype;
  const fileSize = file.size;
  const responseObj = { name: fileName, type: fileType, size: fileSize };

  res.json(responseObj);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
