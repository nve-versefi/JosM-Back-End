require('dotenv').config({ path: '../creds.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const mailer = require('./mailer');
const path = require('path'); 

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Dynamically encode the password and build the URI
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterAddress = process.env.DB_CLUSTER_ADDRESS;
const databaseName = process.env.DB_NAME;

const atlasUri = `mongodb+srv://${username}:${password}@${clusterAddress}/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(atlasUri, {
}).then(() => {
  console.log('Conexión exitosa a MongoDB Atlas');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

app.use(express.json());



app.use('/', routes);

// Mailer
app.use('/', mailer);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/galeria', express.static(path.join(__dirname, 'galeria')));

app.listen(PORT, () => {
  console.log(`Servidor en www.orquestajosm.com:${PORT}`);
});
