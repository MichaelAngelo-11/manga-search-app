const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname)); // Serve static files in the root

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
