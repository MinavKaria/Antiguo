import express from "express";
import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../configs/firebase.js";

const router = express.Router();

// const upload = multer({ dest: 'uploads/' });

router.get("/", (req, res) => {
  res.send("Hello, World! from /api");
});

// router.post("/upload", upload.single('pdf'), async (req, res) => {
//   try {
//     if (!req.file) 
//     {
//       return res.status(400).send("No file uploaded");
//     }

//     console.log("File details:", req.file);

//     // if (req.file.mimetype !== 'application/pdf') {
//     //   return res.status(400).send("Uploaded file is not a PDF");
//     // }

//     const stats = await fs.promises.stat(req.file.path);
//     console.log("File size:", stats.size, "bytes");

//     if (stats.size === 0) {
//       return res.status(400).send("Uploaded file is empty");
//     }

//     const fileName = `${uuidv4()}.pdf`;

//     console.log("Attempting to upload to Firebase Storage...");

//     const storageRef = ref(storage, `pdfs/${fileName}`);

//     const fileBuffer = await fs.promises.readFile(req.file.path);
//     const snapshot = await uploadBytes(storageRef, fileBuffer, {
//       contentType: 'application/pdf'
//     });

//     console.log('Uploaded a blob or file!');

//     const downloadURL = await getDownloadURL(snapshot.ref);

//     console.log("Firebase Storage upload successful");
//     res.json({ message: "PDF received and uploaded to Firebase Storage", pdfUrl: downloadURL });

//   } 
//   catch (error) 
//   {
//     console.error("Error in /pdf route:", error);
//     res.status(500).send("Error processing or uploading file");
//   } 
//   finally 
//   {
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) console.error("Error deleting file:", err);
//       });
//     }
//   }
// });


// Version 2

// router.post("/upload", upload.single('file'), async (req, res) => {
//   try {
//     const fileType = req.body.type; 

//     if (!req.file || !fileType) {
//       return res.status(400).send("No file or file type specified");
//     }

//     console.log("File details:", req.file);

  
//     if (fileType === 'pdf' && req.file.mimetype !== 'application/pdf') {
//       return res.status(400).send("Uploaded file is not a PDF");
//     }

//     if (fileType === 'image' && !req.file.mimetype.startsWith('image/')) {
//       return res.status(400).send("Uploaded file is not an image");
//     }

//     const stats = await fs.promises.stat(req.file.path);
//     console.log("File size:", stats.size, "bytes");

//     if (stats.size === 0) {
//       return res.status(400).send("Uploaded file is empty");
//     }

//     const extension = fileType === 'pdf' ? 'pdf' : req.file.mimetype.split('/')[1];
//     const fileName = `${uuidv4()}.${extension}`;

//     console.log("Attempting to upload to Firebase Storage...");

//     const storageDirectory = fileType === 'pdf' ? 'pdfs' : 'images';
//     const storageRef = ref(storage, `${storageDirectory}/${fileName}`);

//     const fileBuffer = await fs.promises.readFile(req.file.path);
//     const snapshot = await uploadBytes(storageRef, fileBuffer, {
//       contentType: req.file.mimetype
//     });

//     console.log('Uploaded a blob or file!');

//     const downloadURL = await getDownloadURL(snapshot.ref);

//     console.log("Firebase Storage upload successful");
//     res.json({ message: `${fileType.toUpperCase()} received and uploaded to Firebase Storage`, fileUrl: downloadURL });

//   } catch (error) {
//     console.error("Error in /upload route:", error);
//     res.status(500).send("Error processing or uploading file");
//   } finally {
//     if (req.file) {
//       fs.unlink(req.file.path, (err) => {
//         if (err) console.error("Error deleting file:", err);
//       });
//     }
//   }
// });

// export default router;

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single('file'), async (req, res) => {
  try {
    const fileType = req.body.type; 

    if (!req.file || !fileType) {
      return res.status(400).send("No file or file type specified");
    }

    console.log("File details:", req.file);

    if (fileType === 'pdf' && req.file.mimetype !== 'application/pdf') {
      return res.status(400).send("Uploaded file is not a PDF");
    }

    if (fileType === 'image' && !req.file.mimetype.startsWith('image/')) {
      return res.status(400).send("Uploaded file is not an image");
    }

    const extension = fileType === 'pdf' ? 'pdf' : req.file.mimetype.split('/')[1];
    const fileName = `${uuidv4()}.${extension}`;

    console.log("Attempting to upload to Firebase Storage...");

    const storageDirectory = fileType === 'pdf' ? 'pdfs' : 'images';
    const storageRef = ref(storage, `${storageDirectory}/${fileName}`);

    // Use req.file.buffer instead of reading from the file system
    const snapshot = await uploadBytes(storageRef, req.file.buffer, {
      contentType: req.file.mimetype
    });

    console.log('Uploaded a blob or file!');

    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Firebase Storage upload successful");
    res.json({ message: `${fileType.toUpperCase()} received and uploaded to Firebase Storage`, fileUrl: downloadURL });

  } catch (error) {
    console.error("Error in /upload route:", error);
    res.status(500).send("Error processing or uploading file");
  }
});

export default router;