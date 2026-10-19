const db = require('../config/db');

const getAllCertificates = async () => {
    const [rows] = await db.query('SELECT * FROM certificates');
    return rows;
};

const getCertificateById = async (id) => {
    const [rows] = await db.query('SELECT * FROM certificates WHERE id = ?', [id]);
    return rows[0];
}

const createCertificate = async (data) => {
    const { name, issuer, issue_date, expiration_date, credential_id, credential_url, description } = data;

    const [result] = await db.query(`insert into certificates (name, issuer, issue_date, expiration_date, credential_id, credential_url, description) values (?, ?, ?, ?, ?, ?, ?)`,
        [name, issuer, issue_date, expiration_date || null, credential_id || null, credential_url || null, description || null]
    );
    return result;
};

const updateCertificate = async (id, data) => {
    const { name, issuer, issue_date, expiration_date, credential_id, credential_url, description } = data;

    const [result] = await db.query(`update certificates set name = ?, issuer = ?, issue_date = ?, expiration_date = ?, credential_id = ?, credential_url = ?, description = ? where id = ?`,
        [name, issuer, issue_date, expiration_date || null, credential_id || null, credential_url || null, description || null, id]
    );
    return result;
}

const deleteCertificate = async (id) => {
    const [result] = await db.query('delete from certificates where id = ?', [id]);
    return result;
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
};