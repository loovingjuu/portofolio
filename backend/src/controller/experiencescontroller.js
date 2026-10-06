const experiencemodel = require('../models/experiencemodels');

const getAllExperiences = async (req, res) => {
    try {
        const experiences = await experiencemodel.getAllExperiences();
        res.status(200).json({ success: true, total: experiences.length, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const experience = await experiencemodel.getExperienceById(id);

        if (!experience) {
            return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
        }

        res.status(200).json({ success: true, data: experience });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const createExperience = async (req, res) => {
    try {
        const data = req.body;

        if (!data.title) return res.status(400).json({ success: false, message: 'title harus diisi' });
        if (!data.company) return res.status(400).json({ success: false, message: 'company harus diisi' });

        const result = await experiencemodel.createExperience(data);
        res.status(201).json({ success: true, message: 'data berhasil ditambahkan', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.title) return res.status(400).json({ success: false, message: 'title harus diisi' });
        if (!data.company) return res.status(400).json({ success: false, message: 'company harus diisi' });

        const result = await experiencemodel.updateExperience(id, data);

        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'data tidak ditemukan' });

        res.status(200).json({ success: true, message: 'experience berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await experiencemodel.deleteExperience(id);

        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'data tidak ditemukan' });

        res.status(200).json({ success: true, message: 'experience dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

module.exports = {
    getAllExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
};