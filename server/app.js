const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const BookSchema = require('./schema/schema');

const app = express();

// allow cross origin requests
app.use(cors());

// connect to mongoose db
mongoose.connect('mongodb+srv://Airish:zpxlcmvn@graphql-cluster.lkwr8.mongodb.net/graph?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema: BookSchema,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('Graphql Server started on port 3000');
});
