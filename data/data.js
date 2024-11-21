const users = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    password: "JohnDoe@123",
  },
  {
    id: 1,
    name: "Jane Smith",
    email: "janesmith@example.com",
    username: "janesmith",
    password: "JaneSmith@123",
  },
];

const tokens = []; //[{userId: number, refreshToken: string, expirationTime: number }]
module.exports = { users, tokens };
