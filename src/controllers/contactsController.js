const {
    getContact,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateContactStatus,
} = require("../services/contactsServices");
const { WrongParametersError } = require("../helpers/errors");

const listContactsController = async (req, res) => {
    const { page = 1, limit = 20, favorite = false } = req.query;
    const { id: owner } = req.user;
    const contacts = await getContact(owner, { page, limit, favorite });
    res.status(200).json({ contacts, page, limit });
};
  
const getContactByIdController = async (req, res) => {
    const { id: owner } = req.user;
    const contactId = req.params.id;
    const contact = await getContactById(contactId, owner);
  
    if (!contact) {
      throw new WrongParametersError("Not found");
    }
    res.status(200).json(contact);
};
  
const addContactController = async (req, res) => {
    const { id: owner } = req.user;
    const { name, email, phone, favorite } = req.body;
    const contact = await addContact({ name, email, phone, favorite, owner });
    res.status(201).json(contact);
};
  
const removeContactController = async (req, res) => {
    const contactId = req.params.id;
    const { id: owner } = req.user;
    const contact = await getContactById(contactId, owner);

    if (!contact) {
        throw new WrongParametersError("Not Found");
    }
    
    removeContact(contactId, owner);
    res.status(200).json({ message: "contact deleted" });
};
  
const updateContactController = async (req, res) => {
    const { id: owner } = req.user;
    const contactId = req.params.id;
    const { name, email, phone } = req.body;
    const checkContact = await getContactById(contactId, owner);

    if (!checkContact) {
        throw new WrongParametersError("Not Found");
    }

    const contact = await updateContact({ name, email, phone }, contactId, owner);
    res.status(200).json(contact);
};
  
const updateStatusContactController = async (req, res) => {
    const { id: owner } = req.user;
    const { favorite } = req.body;
    const contactId = req.params.id;
    const checkContact = await getContactById(contactId, owner);

    if (!checkContact) {
        throw new WrongParametersError("Not Found");
    }
  
    const contact = await updateContactStatus(contactId, owner, { favorite });
    res.status(200).json(contact);
};
  
module.exports = {
    listContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController,
};