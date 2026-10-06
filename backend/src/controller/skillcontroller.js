const skillmodel = require('../models/skillModels');

const getAllSkills = async (req, res) => {
    try {
        const skills = await skillmodel.getAllSkills();
        res.status(200).json({ success: true, total: skills.length, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await skillmodel.getSkillById(id);
        if (!skill) {
            return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
        res.status(200).json({ success: true, data: skill });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const createSkill = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name) return res.status(400).json({ success: false, message: 'nama skill harus diisi' });
        const result = await skillmodel.createSkill(data);
        res.status(201).json({ success: true, message: 'data berhasil ditambahkan', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data.name) return res.status(400).json({ success: false, message: 'nama skill harus diisi' });

        const result = await skillmodel.updateSkill(id, data);
        if (result.affectedRows === 0)  return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
        res.status(200).json({ success: true, message: 'skill berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await skillmodel.deleteSkill(id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'data tidak ditemukan' });
        res.status(200).json({ success: true, message: 'skill dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill
};
