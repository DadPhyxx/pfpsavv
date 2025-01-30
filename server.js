require('dotenv').config();
const express = require('express');
const { REST } = require('@discordjs/rest');
const app = express();
const port = 3000;

app.use(express.static('public')); // Sirve archivos estáticos (HTML)

app.get('/avatar/:userId', async (req, res) => {
  try {
    const restAPI = new REST().setToken(process.env.DISCORD_TOKEN);
    const user = await restAPI.get(`/users/${req.params.userId}`);
    
    // Si el usuario no tiene avatar, usa el avatar por defecto
    const avatarHash = user.avatar || user.discriminator % 5;
    res.json({ avatarHash });
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el avatar" });
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});