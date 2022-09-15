import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourToMinutes } from './util/convertHourToMinutes';
import { convertMinutesToHours } from './util/convertMinutesToHours';

const app = express();
const port = 3333;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

/**
 * Route to get a list os games.
 */
app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        // include == join
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return res.json(games);
});

/**
 * Route to create a new ad.
 */
app.post("/games/:gameId/ads", async (req, res) => {
    const gameId = req.params.gameId;
    const body = req.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,           
            yearsPlaying: body.yearsPlaying,   
            discord: body.discord,        
            weekDays: body.weekDays.join(','),       
            hourStart: convertHourToMinutes(body.hourStart),      
            hourEnd: convertHourToMinutes(body.hourEnd),        
            useVoiceChannel: body.useVoiceChannel,
        }
    });

    return res.status(201).json(ad);
});

/**
 * Route to get ad by an game id.
 */
app.get("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHours(ad.hourStart),
            hourEnd: convertMinutesToHours(ad.hourEnd),
        }
    }));
});

 /**
  * Route to get discord by an ad id.
  */
app.get("/ads/:id/discord", async (req, res) => {
    const adId = req.params.id;

    const ds = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    });

    return res.json({
        discord: ds.discord,
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/ads`);
});