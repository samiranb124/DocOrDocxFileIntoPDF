const express = require('express');
const docxConverter = require('docx-pdf');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(fileUpload({
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100 MB
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/convert', (req, res) => {
  if (!req.files || !req.files.docfile) {
    return res.status(400).send('No file uploaded.');
  }

  const docFile = req.files.docfile;
  const fileName = docFile.name;
//   const outputPath = path.join(__dirname, 'downloads', `${fileName}.pdf`);
  const outputPath = path.join(__dirname, 'downloads', `demo.pdf`);

  docFile.mv(path.join(__dirname, 'uploads', fileName), (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    docxConverter(path.join(__dirname, 'uploads', fileName), outputPath, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.download(outputPath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// const express = require('express');
// const docxConverter = require('docx-pdf');
// const fileUpload = require('express-fileupload');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.static('public'));
// app.use(fileUpload());

// // Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.post('/convert', (req, res) => {
//   if (!req.files || !req.files.docfile) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const docFile = req.files.docfile;
//   const fileName = docFile.name;
// //   const outputPath = path.join(__dirname, 'downloads', `${fileName}.pdf`);
//   const outputPath = path.join(__dirname, 'downloads', `demo.pdf`);

//   docFile.mv(path.join(__dirname, 'uploads', fileName), (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     docxConverter(path.join(__dirname, 'uploads', fileName), outputPath, (err, result) => {
//       if (err) {
//         return res.status(500).send(err);
//       }

//       res.download(outputPath, (err) => {
//         if (err) {
//           return res.status(500).send(err);
//         }
//       });
//     });
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });




// // var docxConverter=require("docx-pdf");
// // docxConverter("demo.docx","output.pdf",function(err,result){
// //     if(err){
// //         console.log(err)
// //     }
// //     console.log("Result"+result)
// // })