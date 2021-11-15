const http = require("http");
const PORT = 8081;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const server = http.createServer(
  listContacts,
  getContactById,
  removeContact,
  addContact
);
server.listen(PORT, (err) => {
  if (err) {
    console.error(" Error at aserver launch: ", err);
  }
  console.log(`Server works at port ${PORT}!`);
});
