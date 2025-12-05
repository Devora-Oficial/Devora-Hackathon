const bcrypt = require("bcrypt");

const senha = "123456";
const hash = "$2b$10$Cw9Wq5JZf4xP9gO8aN4T6OXVyhi0SKxF7hF5ZWSr1L6MjYSY4OwFi";

bcrypt.compare(senha, hash)
  .then(result => console.log("Resultado compare:", result))
  .catch(err => console.error(err));