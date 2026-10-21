const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder penyimpanan file resume
const uploadDir = path.join(__dirname, '../../public/uploads/cv');

// Buat folder jika belum tersedia
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix =
            `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

        const ext = path.extname(file.originalname);

        cb(null, `resume-${uniqueSuffix}${ext.toLowerCase()}`);
    }
});

// Validasi file PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        return cb(null, true);
    }

    return cb(
        new Error('Hanya file bertipe PDF yang diperbolehkan.'),
        false
    );
};


const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Maksimal 5 MB
    }
});

module.exports = upload;