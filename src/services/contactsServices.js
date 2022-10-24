const { Contact } = require("../db/contactsModel");

const getContact = (owner, { page, limit, favorite }) =>
    Contact.find({ owner, favorite })
        .select({ __v: 0 })
        .limit(limit)
        .skip(page > 0 ? (page - 1) * limit : 0); 

const getContactById = (contactId, owner) =>
    Contact.findOne({ _id: contactId, owner });

const addContact = async ({ name, email, phone, favorite, owner }) => {
    const contact = new Contact({ name, email, phone, favorite, owner });
    await contact.save();
    return contact;
};

const removeContact = async (contactId, owner) => {
    await Contact.findOneAndDelete({ _id: contactId, owner });
};

const updateContact = async ({ name, email, phone }, contactId, owner) => {
    await Contact.findByIdAndUpdate(
        { _id: contactId, owner },
        {
            $set: { name, email, phone },
        });

    return Contact.findOne({ _id: contactId, owner });
};

const updateContactStatus =async (contactId, owner, { favorite }) => {
    await Contact.findOneAndUpdate(
        { _id: contactId, owner },
        {
            $set: { favorite },
        }
    );
    return Contact.findOne({ _id: contactId, owner });
};

module.exports = {
    getContact,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateContactStatus,
};