require('dotenv').config();
const express = require('express');

const authRouter = require('./routers/auth.router');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: "welcome"
  });
});

app.use('/auth', authRouter);
app.use(userRouter);
app.use(productRouter);

app.listen(8001, () => {
  console.log("server listen on port 8000");
});