const contact = require('../models/contactmodel');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await contact.getAllContacts();
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getContactById = async (req, res) => {
    try {
        const data = await contact.getContactById(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: 'not found' });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const result = await contact.createContact(req.body);
        res.status(201).json({ success: true, message: 'contact saved', data: { id: result.insertid, ...req.body }, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'invalid data', error: error.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const result = await contact.deleteContact(req.params.id);
        if (result.affectedRows === 0) 
            return res.status(404).json({ success: false, message: 'not found' });
        res.status(200).json({ success: true, message: 'contact deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'server error', error: error.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact
};