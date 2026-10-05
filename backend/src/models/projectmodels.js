const db = require('../config/db');

const getallProjects = async () => {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
};

const getProjectById = async (id) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
}

const createProject = async (project) => {
    const { tittle, decription, category, image_url, demo_url, github_url, tech_stack, is_featured} = data;

    const [result] = await db.query(
        'INSERT INTO projects (tittle, decription, category, image_url, demo_url, github_url, tech_stack, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [tittle, decription, category, image_url, demo_url, github_url, tech_stack, is_featured|| false]
    );
    return result.insertId;
}

const updateProject = async (id, project) => {
    const { tittle, decription, category, image_url, demo_url, github_url, tech_stack, is_featured} = data;

    const [result] = await db.query(
        'UPDATE projects SET tittle = ?, decription = ?, category = ?, image_url = ?, demo_url = ?, github_url = ?, tech_stack = ?, is_featured = ? WHERE id = ?',
        [tittle, decription, category, image_url, demo_url, github_url, tech_stack, is_featured|| false, id]
    );
    return result.affectedRows > 0;
}

const deleteProject = async (id) => {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    getallProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};