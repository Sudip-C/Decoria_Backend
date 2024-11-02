
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cors= require('cors')

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
