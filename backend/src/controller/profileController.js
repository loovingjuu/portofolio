const profilemodel = require('../models/profilemodel');

const getProfile = async (req, res) => {
    try {
        const profile = await profilemodel.getProfile();

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'data profil belum tersedia',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mendapatkan data profil',
            data: profile,
        });
    } catch (error) {
        console.error('❌ Kesalahan saat mendapatkan data profil:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if(!data.name || !data.role) {
            return res.status(400).json({
                success: false,
                message: 'kolom "Nama" dan "Peran" harus diisi',
            });
        }

        const result = await profilemodel.updateProfile(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Profil dengan id ${id} tidak ditemukan`,
            });
        }

        res.status(200).json({
                success: true,
                message: 'data profil berhasil diperbarui',
        });
    } catch (error) {
        console.error('error updateProfile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};