const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

let users =[] ;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("starBackend");
});

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// POST
app.post("/users", (req, res) => {
  const { name, email } = req.body;


  const newUser = {
    id: users.length +1,
    name,
    email
  };

  users.push(newUser)
  res.json({
    message: "Create user",
    data: {
      name,
      email
    }
  });
});

// PUT
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  user.name = name;
  user.email = email;

  res.json({
    message: "Update user",
    data: user
  });
});

// PATCH
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  if (name !== undefined) {
    user.name = name;
  }

  if (email !== undefined) {
    user.email = email;
  }

  res.json({
    message: "Update user",
    data: user
  });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "Delete user",
    id
  });
});

// GET
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
  console.log("Swagger at http://localhost:" + PORT + "/api-docs");
});