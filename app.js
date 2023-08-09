const express = require("express")
const morgan = require("morgan")

const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//stands in the middle between request and response
app.use(express.json()) //middleware is a function that can modify incoming request data

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log("hello from middleware")
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// 3) ROUTES

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app
