const testimoniModel = require('../models/testimonimodel');

const getAllTestimoni = async (req, res) => {
    try {
        const testimoni = await testimoniModel.getAllTestimoni();
        res.status(200).json({ success: true, total: testimoni.length, data: testimoni });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const getTestimoniById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimoni = await testimoniModel.getTestimoniById(id);

        if (!testimoni) {
            return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
        }

        res.status(200).json({ success: true, data: testimoni });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const createTestimoni = async (req, res) => {
    try {
        const data = req.body;

        if (!data.name) return res.status(400).json({ success: false, message: 'nama harus diisi' });
        if (!data.role) return res.status(400).json({ success: false, message: 'role harus diisi' });
        if (!data.message) return res.status(400).json({ success: false, message: 'message harus diisi' });

        const result = await testimoniModel.createTestimoni(data);
        res.status(201).json({ success: true, message: 'testimoni berhasil ditambahkan', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const updateTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.name) return res.status(400).json({ success: false, message: 'nama harus diisi' });
        if (!data.role) return res.status(400).json({ success: false, message: 'role harus diisi' });
        if (!data.message) return res.status(400).json({ success: false, message: 'message harus diisi' });

        const result = await testimoniModel.updateTestimoni(id, data);

        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'data tidak ditemukan' });

        res.status(200).json({ success: true, message: 'testimoni berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const deleteTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await testimoniModel.deleteTestimoni(id);

        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'data tidak ditemukan' });

        res.status(200).json({ success: true, message: 'testimoni berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

module.exports = {
    getAllTestimoni,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni
};