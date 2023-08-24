require("dotenv/config");
require("express-async-errors");

const express = require("express")
const cors = require("cors");

const AppError = require("./utils/AppError");
const routes = require("./routes/index");
const uploadConfig = require("./configs/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  };

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${ PORT }`));

app.get("/", (request, response) => {
  response.json("Hello world :)");
})