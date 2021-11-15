const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function getListContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id === contactId
    );
    if (!filteredContacts) {
      return null;
    }
    return filteredContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const updateContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (!updateContacts) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: v4(), name, email, phone };
    const updateContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    return updateContacts;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { getListContacts, getContactById, removeContact, addContact };
