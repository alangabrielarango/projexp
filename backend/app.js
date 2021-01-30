//importing packages
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//importing routes for each colleciton
const categoryRoutes = require('./routes/category.routes');
const subcategoryRoutes = require('./routes/subcategory.routes');
const phaseRoutes = require('./routes/phase.routes');
const projectRoutes = require('./routes/project.routes');
const projectPhaseRoutes = require('./routes/project-phase.routes');
const roleRoutes = require('./routes/role.routes');
const routeRoutes = require('./routes/route.routes');
const permissionRoutes = require('./routes/permission.routes');
const userRoutes = require('./routes/user.routes');
const expenseRoutes = require('./routes/expense.routes');
const reportRoutes = require('./routes/report.routes');
const listRoutes = require('./routes/lists.routes');

const app = express();

//getting mongo connection string from env var
const url = process.env.MONGO;
//connecting to database with mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
  console.log("Connected to DB");
})
.catch(()=>{
  console.log("Connection to DB failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//setting headers allowed
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  //setting headers including authorization for the token in jwt
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //setting http methods allowed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

//loading routes
app.use('/category', categoryRoutes);
app.use('/subcategory', subcategoryRoutes);
app.use('/phase', phaseRoutes);
app.use('/project', projectRoutes);
app.use('/projectphase', projectPhaseRoutes);
app.use('/role', roleRoutes);
app.use('/route', routeRoutes);
app.use('/permission', permissionRoutes);
app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/expense-report', reportRoutes);
app.use('/lists', listRoutes);

module.exports = app;
