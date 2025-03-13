module.exports = (app) => {
    const { v4: uuidV4 } = require('uuid');
    const db = require('../models/db.js');
    const QUERY = require('../query/resources.query.js');
    const express = require('express');
    const path = require('path');
    const mysql = require('mysql2');
    const multer = require('multer');
    const xlsx = require("xlsx");

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            const title = req.body.title.replace(/\s+/g, '-').toLowerCase() || req.body.update_title.replace(/\s+/g, '-').toLowerCase();;
            cb(null, `${title}-${Date.now()}-${file.originalname}`);
        }
    });

    const storage2 = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            const title = req.body.update_title.replace(/\s+/g, '-').toLowerCase();;
            cb(null, `${title}-${Date.now()}-${file.originalname}`);
        }
    });

    const upload = multer({ storage: storage });
    const upload2 = multer({ storage: storage2 });
    const upload3 = multer({ dest: "./uploads" });

    app.use(express.static(path.join(__dirname, 'public')));


    app.post('/add-resources', upload.single('file'), (req, res) => {
        const { title, download_link, isbn } = req.body;
        const filename = req.file.filename;

        const inputData = {
            resource_id: uuidV4(),
            title: title,
            url_link: download_link,
            ISBN: isbn,
            image: filename,
            createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };


        const sql = 'INSERT INTO resources (resource_id, title, url_link, ISBN, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const values = [
            inputData.resource_id,
            inputData.title,
            inputData.url_link,
            inputData.ISBN,
            inputData.image,
            inputData.createdAt,
            inputData.updatedAt
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error inserting data:', err);
                return res.json({ message: 'Error inserting data into database' });
            }
            console.log('Data inserted successfully');
            res.json({ message: 'Form submitted successfully', data: { title, download_link, isbn, filename } });
        });
    });

    app.post('/api/update/resources', upload2.single('update_file'), (req, res) => {
        const { update_id, update_title, update_download_link, update_isbn } = req.body;
        const filename = req.file.filename;

        const inputData = {
            title: update_title,
            url_link: update_download_link,
            ISBN: update_isbn,
            image: filename,
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            id: update_id
        };


        const sql = 'UPDATE resources SET title = ?, url_link = ?, ISBN = ?, image = ?, updatedAt = ? WHERE id = ?';

        const values = [
            inputData.title,
            inputData.url_link,
            inputData.ISBN,
            inputData.image,
            inputData.updatedAt,
            inputData.id
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error updating data:', err);
                return res.json({ message: 'Error updating data in database' });
            }
            console.log('Data updated successfully');
            res.json({ message: 'Resource updated successfully', data: inputData });
        });
    });



    app.post('/api/v1/post/upload-resources', upload3.single('excelFile'), (req, res) => {
        
        console.log(`req.file ==>`, req.file)
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }

        const filePath = path.join(`/var/www/html/${process.env.GERGI_FOLDER}/`, req.file.path);
        console.log(`req.file.path ==>`, req.file.path)
        console.log(`__dirname ==>`, __dirname)
        console.log(`filePath ==>`, filePath)
        const workbook = xlsx.readFile(filePath);
        console.log(`workbook ==>`, workbook)
        const sheetName = workbook.SheetNames[0];
        console.log(`sheetName ==>`, sheetName)
        const sheet = workbook.Sheets[sheetName];
        console.log(`sheet ==>`, sheet)

        // Convert Excel sheet to JSON
        const extractedData = xlsx.utils.sheet_to_json(sheet);
        console.log(`extractedData ==>`, extractedData)


        const sql = `INSERT INTO resources (resource_id, title, url_link, image, createdAt, updatedAt) VALUES ?`;

            const values = extractedData.map((inputData) => [
                inputData.resource_id = uuidV4(),
                inputData.book_title,
                inputData.download_link,
                inputData.image_link,
                inputData.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '),
                inputData.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
            ]);

            console.log(`[values] ==> `, [values]);

            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.json({ message: 'Error inserting data into database' });
                }
                console.log('Data inserted successfully:', result.affectedRows);
                res.json({
                    message: 'Form submitted successfully',
                    insertedRows: result.affectedRows
                });
            });


        // Delete the file after processing
        // fs.unlinkSync(filePath);

        // Insert data into the database
        // if (extractedData.length > 0) {
        //     const sql = "INSERT INTO uploaded_files (name, download_link, image_link) VALUES ?";
        //     const values = extractedData.map(row => [row.Name, row.DownloadLink, row.ImageLink]);

        //     db.query(sql, [values], (err, result) => {
        //         if (err) return res.status(500).json({ message: "Database error", error: err });

        //         res.json({ message: "✅ Data uploaded successfully!", data: extractedData });
        //     });
        // } else {
        //     res.status(400).json({ message: "No valid data found in the file!" });
        // }


    });


};
