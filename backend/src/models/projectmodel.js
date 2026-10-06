const db = require('../config/db');

const getAllProjects = async () => {
    const [rows] = await db.query('SELECT * FROM projects');
    return rows;
};

const getProjectById = async (id) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
}

const createProject = async (project) => {
    const { title, decription, category, image_url, demo_url, github_url, tech_stack, is_featured} = project;

    const [result] = await db.query(
        'INSERT INTO projects (title, decription, category, image_url, demo_url, github_url, tech_stack, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, decription, category, image_url, demo_url, github_url, tech_stack, is_featured|| false]
    );
    return result.insertId;
}

const updateProject = async (id, project) => {
    const { title, decription, category, image_url, demo_url, github_url, tech_stack, is_featured} = project;

    const [result] = await db.query(
        'UPDATE projects SET title = ?, decription = ?, category = ?, image_url = ?, demo_url = ?, github_url = ?, tech_stack = ?, is_featured = ? WHERE id = ?',
        [title, decription, category, image_url, demo_url, github_url, tech_stack, is_featured|| false, id]
    );
    return result.affectedRows > 0;
}

const deleteProject = async (id) => {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};