
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const db = require('./config/db');

const app = express();
const PORT = process.env.PORT;

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang di API Portofolio Dinamis!',
        version: '1.0.0'
    });
});

app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server dalam keadaan sehat dan aktif.',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
        "success": true,
        "data": {
            "nama": "jostein masarrang",
            "kelas": "XI RPL 1",
            "cita_cita": "programer",
            "hobi": "Coding & Gaming"
        }
    });
});

const profileRoutes = require('./routers/profileRoutes');
const projectRoutes = require('./routers/projectroutes');

app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan!'
    });
});

app.listen(PORT, () => {
    console.log(`===================================`);
    console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===================================`);
});