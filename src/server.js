require("express-async-errors");
const express = require("express")

const AppError = require("./utils/AppError");
const sqliteConnection = require("./database/sqlite");

const app = express();

//middleware p/ tratamento de erros
//se o erro for uma instância da classe AppError, ele retorna um status e mensagem de erro adequados.Caso contrário, o erro será tratado como um erro interno do servidor e retornará status 500
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

sqliteConnection();

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${ PORT }`));

app.get("/", (request, response) => {
  response.json("Hello world :)");
})