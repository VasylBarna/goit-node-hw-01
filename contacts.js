const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id === contactId
    );
    console.table(filteredContacts);
    return filteredContacts;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const updateContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (!updateContacts) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const newContact = { id: v4(), name, email, phone };
    const updateContacts = [newContact, ...contacts];
    console.table(updateContacts);
    return;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
