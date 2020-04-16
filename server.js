const express = require("express");

const app = express();

app.get('/', (req, res) => res.send('API running'));

// look for environment variable called PORT to use when we deploy it in Heroku || locally run port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));