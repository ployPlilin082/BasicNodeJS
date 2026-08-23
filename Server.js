const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(req,res)=> {
    res.send("starBackend");
});
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Somchai" },
    { id: 2, name: "Somsri" }
  ]);
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
  console.log("Swagger at http://localhost:" + PORT + "/api-docs");
});
