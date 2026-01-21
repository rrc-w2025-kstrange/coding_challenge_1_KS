
import express, { Express } from "express";
import playerService from "./services/playerService";

const app: Express = express();

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.get("/api/v1/players", (req, res) => {
    const players = playerService.getAllPlayers();
    res.json({
        count: players.length,
        players
    });
});

app.get("/api/v1/players/:id", (req, res) => {
    const id = Number(req.params.id);
    const player = playerService.getPlayerById(id);

    if (!player) {
        res.status(404).json({ message: "Player not found" });
        return;
    }

    res.json(player);
});

app.get("/api/v1/players/:id/rating", (req, res) => {
    const id = Number(req.params.id);
    const player = playerService.getPlayerById(id);

    if (!player) {
        res.status(404).json({ message: "Player not found" });
        return;
    }

    const rating = playerService.ratingCalculation(player);

    res.json({
        id: player.id,
        name: player.name,
        rating,
        totalGames: player.wins + player.losses
    });
});

export default app;
