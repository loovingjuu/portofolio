const db    = require('../config/db'); 

const getAllSkills = async () => {
    const [rows] = await db.query('SELECT * FROM skills order by category, name');
    return rows;
};

const getSkillById = async (id) => {
    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
    return rows[0];
}

const createSkill = async (data) => {
    const { name, category, precentage, icon_url } = data;
    const [result] = await db.query('INSERT INTO skills (name, category, precentage, icon_url) VALUES (?, ?, ?, ?)',
    [name, category || 'Other', precentage || 0, icon_url]);
    return result;
}

const updateSkill = async (id, data) => {
    const { name, category, precentage, icon_url } = data;
    const [result] = await db.query('UPDATE skills SET name = ?, category = ?, precentage = ?, icon_url = ? WHERE id = ?',
    [name, category || 'Other', precentage || 0, icon_url, id]);
    return result;
}

const getSkillsById = async (id) => {
    const [result] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
    return result;
}

module.exports = {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    getSkillsById
};