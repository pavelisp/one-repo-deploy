if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const warehouseRoutes = require('./routes/warehouses');
const inventoryRoutes = require('./routes/inventories');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/warehouses', warehouseRoutes);
app.use('/api/v1/inventories', inventoryRoutes);

// Make sure you put this code snippet AFTER you define
// your routes, but BEFORE you set up app.listen!

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
