import express from 'express';

const app = express();
const port = 3333;

/**
 * Route to get a list os games.
 */
app.get("/games", (req, res) => {
    return res.json([]);
});

/**
 * Route to create a new ad.
 */
app.post("/ads", (req, res) => {
    return res.json([]);
});

/**
 * Route to get ad by an game id.
 */
app.get("/games/:id/ads", (req, res) => {
    //const gameId = req.params.id;

    return res.json([
        { id: 1, name: "Anuncio 1" },
        { id: 2, name: "Anuncio 2" },
        { id: 3, name: "Anuncio 3" },
    ]);
});

 /**
  * Route to get discord by an ad id.
  */
app.get("/ads/:id/discord", (req, res) => {
    //const adId = req.params.id;

    return res.json([]);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/ads`);
});