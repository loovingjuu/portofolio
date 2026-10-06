const projectModel = require('../models/projectModel');


const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.getAllProjects();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data proyek.',
            total: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error getAllProjects:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};


const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.getProjectById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
}

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data proyek.',
            data: project
        });
    } catch (error) {
        console.error('Error getProjectById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};


const createProject = async (req, res) => {
    try {
        const data = req.body;

        if (!data.tittle) {
            return res.status(400).json({
                success: false,
                message: 'Judul proyek tidak boleh kosong.'
            });
        }

        const projectId = await projectModel.createProject(data);

        res.status(201).json({
            success: true,
            message: 'Proyek baru berhasil ditambahkan.',
            data: {id: result.insertId}
        });
    } catch (error) {
        console.error('Error createProject:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.title) {
            return res.status(400).json({
                success: false,
                massage: 'kolom tittle tidak boleh kosong'
            });
        }

        const result = await projectModel.updateProject(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Proyek berhasil diperbarui.',
            data: {id}
        });
    } catch (error) {
        console.error('Error updateProject:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await projectModel.deleteProject(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Proyek berhasil dihapus.',
        });
    } catch (error) {
        console.error('Error deleteProject:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};