const certificateModel = require('../models/certificatemodel');

const getAllCertificates = async (req, res) => {
    try {
        const certificates = await certificateModel.getAllCertificates();
        res.status(200).json({
            success: true,
            total: certificates.length,
            data: certificates
        });
    }catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching certificates.'
        });
    }
};

const getCertificateById = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await certificateModel.getCertificateById(id);

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: 'Certificate tidak ditemukan.'
            });
        }

        res.status(200).json({
            success: true,
            data: certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        });
    }
};

const createCertificate = async (req, res) => {
    try {
        const data = req.body;

        if (!data.name || !data.issuer || !data.issue_date) {
            return res.status(400).json({
                success: false,
                message: 'Name, issuer, and issue_date are required fields.'
            });
        }

        const newCertificate = await certificateModel.createCertificate(data);
        res.status(201).json({
            success: true,
            message: 'Certificate berhasil ditambahkan.',
            data: newCertificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        });
    }
};

const updateCertificate = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const updatedCertificate = await certificateModel.updateCertificate(id, data);

        if (updatedCertificate.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Certificate data tidak ditemukan.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Certificate berhasil diperbarui.',
            data: updatedCertificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCertificate = await certificateModel.deleteCertificate(id);

        if (deletedCertificate.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Certificate data tidak ditemukan.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Certificate berhasil dihapus.',
            data: deletedCertificate
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
};