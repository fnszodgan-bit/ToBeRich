const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Optional Supabase integration for stats persistence
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    : null;

// Health check endpoint for UptimeRobot to keep Render free instance active 24/7
app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'ToBeRich Global Syndicate Server',
    activeRooms: Object.keys(rooms).length,
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// ==========================================
// GAME CATALOGS & DEFINITIONS (ENGLISH)
// ==========================================
const CHARACTERS = [
  { id: 'blob_lime', name: 'Lime Classic', color: '#a3e635', category: 'basic', priceCoins: 0, priceDiamonds: 0 },
  { id: 'blob_amber', name: 'Amber Classic', color: '#fbbf24', category: 'basic', priceCoins: 0, priceDiamonds: 0 },
  { id: 'blob_sky', name: 'Sky Classic', color: '#38bdf8', category: 'basic', priceCoins: 0, priceDiamonds: 0 },
  { id: 'blob_coral', name: 'Coral Classic', color: '#f87171', category: 'basic', priceCoins: 0, priceDiamonds: 0 },
  { id: 'blob_mint', name: 'Mint Classic', color: '#34d399', category: 'basic', priceCoins: 0, priceDiamonds: 0 },
  { id: 'blob_violet', name: 'Violet Classic', color: '#a78bfa', category: 'basic', priceCoins: 0, priceDiamonds: 0 },
  { id: 'fox', name: 'Golden Fox', color: '#f97316', category: 'animal', priceCoins: 150, priceDiamonds: 25 },
  { id: 'cat', name: 'Cosmic Cat', color: '#38bdf8', category: 'animal', priceCoins: 150, priceDiamonds: 25 },
  { id: 'frog', name: 'Frog King', color: '#10b981', category: 'animal', priceCoins: 180, priceDiamonds: 30 },
  { id: 'duck', name: 'Boss Duck', color: '#eab308', category: 'animal', priceCoins: 180, priceDiamonds: 30 },
  { id: 'panda', name: 'Cyber Panda', color: '#a855f7', category: 'animal', priceCoins: 220, priceDiamonds: 40 },
  { id: 'ghost', name: 'Happy Ghost', color: '#ec4899', category: 'animal', priceCoins: 260, priceDiamonds: 50 },
];

const BOT_POOL = [
  { name: 'Marco_Bot', charId: 'blob_sky', color: '#38bdf8' },
  { name: 'Elena_AI', charId: 'blob_mint', color: '#34d399' },
  { name: 'Tycoon_X', charId: 'blob_violet', color: '#a78bfa' },
  { name: 'Viktor_AI', charId: 'blob_coral', color: '#f87171' },
  { name: 'Sakura_Bot', charId: 'blob_lime', color: '#a3e635' },
  { name: 'Baron_AI', charId: 'blob_amber', color: '#fbbf24' },
  { name: 'Nova_777', charId: 'fox', color: '#f97316' },
];

const THEME_CITIES = {
  world: [
    { country: 'PL', countryName: 'Poland', cities: ['Krakow', 'Gdansk', 'Warsaw'] },
    { country: 'IT', countryName: 'Italy', cities: ['Naples', 'Milan', 'Rome'] },
    { country: 'ES', countryName: 'Spain', cities: ['Seville', 'Barcelona', 'Madrid'] },
    { country: 'DE', countryName: 'Germany', cities: ['Munich', 'Hamburg', 'Berlin'] },
    { country: 'FR', countryName: 'France', cities: ['Lyon', 'Nice', 'Paris'] },
    { country: 'UK', countryName: 'United Kingdom', cities: ['Manchester', 'Edinburgh', 'London'] },
    { country: 'JP', countryName: 'Japan', cities: ['Osaka', 'Kyoto', 'Tokyo'] },
    { country: 'US', countryName: 'USA', cities: ['Chicago', 'Los Angeles', 'New York'] },
    { country: 'CH', countryName: 'Switzerland', cities: ['Geneva', 'Basel', 'Zurich'] },
    { country: 'BR', countryName: 'Brazil', cities: ['Brasilia', 'Rio', 'Sao Paulo'] },
  ],
  europe: [
    { country: 'PL', countryName: 'Poland', cities: ['Wroclaw', 'Krakow', 'Warsaw'] },
    { country: 'GR', countryName: 'Greece', cities: ['Thessaloniki', 'Santorini', 'Athens'] },
    { country: 'NL', countryName: 'Netherlands', cities: ['Utrecht', 'Rotterdam', 'Amsterdam'] },
    { country: 'SE', countryName: 'Sweden', cities: ['Malmo', 'Gothenburg', 'Stockholm'] },
    { country: 'IT', countryName: 'Italy', cities: ['Venice', 'Milan', 'Rome'] },
    { country: 'ES', countryName: 'Spain', cities: ['Valencia', 'Barcelona', 'Madrid'] },
    { country: 'FR', countryName: 'France', cities: ['Marseille', 'Nice', 'Paris'] },
    { country: 'CH', countryName: 'Switzerland', cities: ['Bern', 'Geneva', 'Zurich'] },
    { country: 'DE', countryName: 'Germany', cities: ['Frankfurt', 'Munich', 'Berlin'] },
    { country: 'UK', countryName: 'United Kingdom', cities: ['Liverpool', 'Edinburgh', 'London'] },
  ],
  asia_americas: [
    { country: 'BR', countryName: 'Brazil', cities: ['Salvador', 'Rio', 'Sao Paulo'] },
    { country: 'CA', countryName: 'Canada', cities: ['Montreal', 'Vancouver', 'Toronto'] },
    { country: 'KR', countryName: 'South Korea', cities: ['Incheon', 'Busan', 'Seoul'] },
    { country: 'AU', countryName: 'Australia', cities: ['Brisbane', 'Melbourne', 'Sydney'] },
    { country: 'JP', countryName: 'Japan', cities: ['Osaka', 'Kyoto', 'Tokyo'] },
    { country: 'US', countryName: 'USA', cities: ['Miami', 'Los Angeles', 'New York'] },
    { country: 'PL', countryName: 'Poland', cities: ['Poznan', 'Krakow', 'Warsaw'] },
    { country: 'CH', countryName: 'Switzerland', cities: ['Lausanne', 'Geneva', 'Zurich'] },
    { country: 'FR', countryName: 'France', cities: ['Lyon', 'Nice', 'Paris'] },
    { country: 'UK', countryName: 'United Kingdom', cities: ['Bristol', 'Edinburgh', 'London'] },
  ],
};

const CHANCE_CARDS = [
  { title: 'Stock Dividend', text: 'Your tech stocks surged! Collect +$150.', action: 'money', amount: 150 },
  { title: 'Tax Refund', text: 'Treasury department returns overpaid tax. Collect +$100.', action: 'money', amount: 100 },
  { title: 'Speeding Fine', text: 'Radar caught your supercar. Pay $80 to Vacation pool.', action: 'tax', amount: 80 },
  { title: 'Property Renovation', text: 'District infrastructure upgrade. Pay $120 maintenance fee.', action: 'tax', amount: 120 },
  { title: 'Jet to START', text: 'Fly straight to START and collect +$200!', action: 'move', target: 0 },
  { title: 'Tax Audit', text: 'Accounting irregularities! Go directly to Jail.', action: 'jail' },
  { title: 'Venture Grant', text: 'Innovation fund awards you +$200!', action: 'money', amount: 200 },
];

function makeRentTable(price) {
  const base = Math.max(8, Math.round(price * 0.16));
  return [
    base,
    Math.round(price * 0.55),
    Math.round(price * 1.45),
    Math.round(price * 2.9),
    Math.round(price * 4.2),
    Math.round(price * 5.6),
  ];
}

function enrichTile(t) {
  if (t.type === 'property' && t.group) {
    return {
      id: t.id,
      name: t.name,
      type: 'property',
      country: t.group.country,
      countryName: t.group.countryName,
      price: t.price,
      houseCost: t.houseCost || Math.max(50, Math.round(t.price * 0.5)),
      rent: makeRentTable(t.price),
    };
  }
  if (t.type === 'property' && !t.rent) {
    return {
      ...t,
      houseCost: t.houseCost || Math.max(50, Math.round((t.price || 100) * 0.5)),
      rent: makeRentTable(t.price || 100),
    };
  }
  return t;
}

function generateBoardTiles(size = 24, theme = 'world', gameMode = 'gambling', customTiles = null) {
  if (theme === 'custom' && Array.isArray(customTiles) && customTiles.length === 32) {
    return customTiles.map((t, idx) => enrichTile({ ...t, id: idx }));
  }

  const groups = THEME_CITIES[theme] || THEME_CITIES.world;
  const isGambling = gameMode === 'gambling';

  if (Number(size) === 24) {
    const g = groups.slice(0, 6);
    return [
      { id: 0, name: 'START', type: 'start' },
      { id: 1, name: g[0].cities[0], type: 'property', group: g[0], price: 60, houseCost: 50 },
      { id: 2, name: isGambling ? 'Casino 777' : 'Chance', type: isGambling ? 'casino' : 'chance' },
      { id: 3, name: g[0].cities[2], type: 'property', group: g[0], price: 80, houseCost: 50 },
      { id: 4, name: 'Airport WAW', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [40, 80, 160, 300] },
      { id: 5, name: g[1].cities[0], type: 'property', group: g[1], price: 110, houseCost: 75 },
      { id: 6, name: 'JAIL', type: 'jail' },
      { id: 7, name: g[1].cities[2], type: 'property', group: g[1], price: 130, houseCost: 75 },
      { id: 8, name: g[2].cities[0], type: 'property', group: g[2], price: 150, houseCost: 100 },
      { id: 9, name: 'Income Tax', type: 'tax', amount: 120 },
      { id: 10, name: g[2].cities[2], type: 'property', group: g[2], price: 170, houseCost: 100 },
      { id: 11, name: 'Airport FRA', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [40, 80, 160, 300] },
      { id: 12, name: 'VACATION', type: 'parking' },
      { id: 13, name: g[3].cities[0], type: 'property', group: g[3], price: 200, houseCost: 125 },
      { id: 14, name: isGambling ? 'Casino VIP' : 'Chance', type: isGambling ? 'casino' : 'chance' },
      { id: 15, name: g[3].cities[2], type: 'property', group: g[3], price: 220, houseCost: 125 },
      { id: 16, name: 'Airport LHR', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [40, 80, 160, 300] },
      { id: 17, name: g[4].cities[0], type: 'property', group: g[4], price: 260, houseCost: 150 },
      { id: 18, name: 'GO TO JAIL', type: 'gotojail' },
      { id: 19, name: g[4].cities[2], type: 'property', group: g[4], price: 280, houseCost: 150 },
      { id: 20, name: 'Airport JFK', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [40, 80, 160, 300] },
      { id: 21, name: g[5].cities[0], type: 'property', group: g[5], price: 340, houseCost: 200 },
      { id: 22, name: isGambling ? 'Casino Royal' : 'Luxury Tax', type: isGambling ? 'casino' : 'tax', amount: 150 },
      { id: 23, name: g[5].cities[2], type: 'property', group: g[5], price: 390, houseCost: 200 },
    ].map(enrichTile);
  }

  if (Number(size) === 40) {
    const g = groups;
    return [
      { id: 0, name: 'START', type: 'start' },
      { id: 1, name: g[0].cities[0], type: 'property', group: g[0], price: 60, houseCost: 50 },
      { id: 2, name: isGambling ? 'Casino 777' : 'Chance', type: isGambling ? 'casino' : 'chance' },
      { id: 3, name: g[0].cities[2], type: 'property', group: g[0], price: 75, houseCost: 50 },
      { id: 4, name: 'Income Tax', type: 'tax', amount: 150 },
      { id: 5, name: 'Airport WAW', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
      { id: 6, name: g[1].cities[0], type: 'property', group: g[1], price: 100, houseCost: 50 },
      { id: 7, name: 'Chance', type: 'chance' },
      { id: 8, name: g[1].cities[1], type: 'property', group: g[1], price: 110, houseCost: 50 },
      { id: 9, name: g[1].cities[2], type: 'property', group: g[1], price: 125, houseCost: 50 },
      { id: 10, name: 'JAIL', type: 'jail' },
      { id: 11, name: g[2].cities[0], type: 'property', group: g[2], price: 140, houseCost: 100 },
      { id: 12, name: g[8].cities[0], type: 'property', group: g[8], price: 150, houseCost: 100 },
      { id: 13, name: g[2].cities[1], type: 'property', group: g[2], price: 155, houseCost: 100 },
      { id: 14, name: g[2].cities[2], type: 'property', group: g[2], price: 170, houseCost: 100 },
      { id: 15, name: 'Airport FRA', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
      { id: 16, name: g[3].cities[0], type: 'property', group: g[3], price: 180, houseCost: 100 },
      { id: 17, name: isGambling ? 'Casino Neon' : 'Chance', type: isGambling ? 'casino' : 'chance' },
      { id: 18, name: g[3].cities[1], type: 'property', group: g[3], price: 190, houseCost: 100 },
      { id: 19, name: g[3].cities[2], type: 'property', group: g[3], price: 205, houseCost: 100 },
      { id: 20, name: 'VACATION', type: 'parking' },
      { id: 21, name: g[4].cities[0], type: 'property', group: g[4], price: 220, houseCost: 150 },
      { id: 22, name: 'Chance', type: 'chance' },
      { id: 23, name: g[4].cities[1], type: 'property', group: g[4], price: 230, houseCost: 150 },
      { id: 24, name: g[4].cities[2], type: 'property', group: g[4], price: 245, houseCost: 150 },
      { id: 25, name: 'Airport LHR', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
      { id: 26, name: g[5].cities[0], type: 'property', group: g[5], price: 260, houseCost: 150 },
      { id: 27, name: g[5].cities[1], type: 'property', group: g[5], price: 270, houseCost: 150 },
      { id: 28, name: g[8].cities[2], type: 'property', group: g[8], price: 280, houseCost: 150 },
      { id: 29, name: g[5].cities[2], type: 'property', group: g[5], price: 290, houseCost: 150 },
      { id: 30, name: 'GO TO JAIL', type: 'gotojail' },
      { id: 31, name: g[6].cities[0], type: 'property', group: g[6], price: 305, houseCost: 200 },
      { id: 32, name: g[6].cities[1], type: 'property', group: g[6], price: 315, houseCost: 200 },
      { id: 33, name: isGambling ? 'Casino VIP' : 'Chance', type: isGambling ? 'casino' : 'chance' },
      { id: 34, name: g[6].cities[2], type: 'property', group: g[6], price: 330, houseCost: 200 },
      { id: 35, name: 'Airport JFK', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
      { id: 36, name: g[9].cities[2], type: 'property', group: g[9], price: 350, houseCost: 200 },
      { id: 37, name: g[7].cities[1], type: 'property', group: g[7], price: 375, houseCost: 200 },
      { id: 38, name: 'Luxury Tax', type: 'tax', amount: 120 },
      { id: 39, name: g[7].cities[2], type: 'property', group: g[7], price: 420, houseCost: 200 },
    ].map(enrichTile);
  }

  // Standard 32 tiles
  const g = groups.slice(0, 8);
  return [
    { id: 0, name: 'START', type: 'start' },
    { id: 1, name: g[0].cities[0], type: 'property', group: g[0], price: 60, houseCost: 50 },
    { id: 2, name: isGambling ? 'Casino 777' : 'Chance', type: isGambling ? 'casino' : 'chance' },
    { id: 3, name: g[0].cities[2], type: 'property', group: g[0], price: 80, houseCost: 50 },
    { id: 4, name: 'Income Tax', type: 'tax', amount: 150 },
    { id: 5, name: 'Airport WAW', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
    { id: 6, name: g[1].cities[0], type: 'property', group: g[1], price: 100, houseCost: 50 },
    { id: 7, name: g[1].cities[2], type: 'property', group: g[1], price: 120, houseCost: 50 },
    { id: 8, name: 'JAIL', type: 'jail' },
    { id: 9, name: g[2].cities[0], type: 'property', group: g[2], price: 140, houseCost: 100 },
    { id: 10, name: g[2].cities[1], type: 'property', group: g[2], price: 150, houseCost: 100 },
    { id: 11, name: g[2].cities[2], type: 'property', group: g[2], price: 160, houseCost: 100 },
    { id: 12, name: 'Airport FRA', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
    { id: 13, name: g[3].cities[0], type: 'property', group: g[3], price: 180, houseCost: 100 },
    { id: 14, name: isGambling ? 'Casino Fortune' : 'Chance', type: isGambling ? 'casino' : 'chance' },
    { id: 15, name: g[3].cities[2], type: 'property', group: g[3], price: 200, houseCost: 100 },
    { id: 16, name: 'VACATION', type: 'parking' },
    { id: 17, name: g[4].cities[0], type: 'property', group: g[4], price: 220, houseCost: 150 },
    { id: 18, name: 'Chance', type: 'chance' },
    { id: 19, name: g[4].cities[2], type: 'property', group: g[4], price: 240, houseCost: 150 },
    { id: 20, name: 'Airport LHR', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
    { id: 21, name: g[5].cities[0], type: 'property', group: g[5], price: 260, houseCost: 150 },
    { id: 22, name: g[5].cities[1], type: 'property', group: g[5], price: 270, houseCost: 150 },
    { id: 23, name: g[5].cities[2], type: 'property', group: g[5], price: 280, houseCost: 150 },
    { id: 24, name: 'GO TO JAIL', type: 'gotojail' },
    { id: 25, name: g[6].cities[0], type: 'property', group: g[6], price: 300, houseCost: 200 },
    { id: 26, name: g[6].cities[1], type: 'property', group: g[6], price: 310, houseCost: 200 },
    { id: 27, name: g[6].cities[2], type: 'property', group: g[6], price: 320, houseCost: 200 },
    { id: 28, name: 'Airport JFK', type: 'airport', country: 'AIR', countryName: 'Aviation', price: 200, rent: [35, 70, 140, 280] },
    { id: 29, name: g[7].cities[1], type: 'property', group: g[7], price: 350, houseCost: 200 },
    { id: 30, name: isGambling ? 'Casino VIP' : 'Luxury Tax', type: isGambling ? 'casino' : 'tax', amount: 100 },
    { id: 31, name: g[7].cities[2], type: 'property', group: g[7], price: 400, houseCost: 200 },
  ].map(enrichTile);
}

// ==========================================
// ACTIVE ROOM STATE IN RAM
// ==========================================
const rooms = {};

function createDefaultRoom(roomId, hostName = 'Alex_VIP', isPrivate = true) {
  const defaultTiles = generateBoardTiles(24, 'world', 'gambling');
  return {
    id: roomId,
    code: roomId,
    name: `${hostName}'s Syndicate Lobby`,
    hostName,
    isPrivate,
    switchedFromPublic: false,
    status: 'LOBBY', // 'LOBBY' | 'PLAYING' | 'FINISHED'
    maxPlayers: 4,
    allowBots: false,
    mapTheme: 'world',
    boardSize: 24,
    gameMode: 'gambling',
    rules: {
      startingCash: 1500,
      rentInJail: false,
      singleTileBuild: true,
      auctionsEnabled: true,
      teamsEnabled: false,
      doubleMonopolyRent: true,
      parkingJackpot: true,
      doubleOnStart: true,
      botSpeedMs: 900,
    },
    boardTiles: defaultTiles,
    customTiles: null,
    players: [],
    matchParticipants: [],
    ownership: {},
    currentTurnIndex: 0,
    turnPhase: 'ROLL', // 'ROLL' | 'MOVING' | 'ACTION' | 'AUCTION' | 'RENT_DECISION' | 'END'
    dice: [5, 2],
    doublesCount: 0,
    hasBonusRoll: false,
    parkingPool: 150,
    pendingRent: null,
    auctionState: null,
    turnTimerSec: 45,
    matchSeconds: 0,
    startedAt: null,
    gameProgression: [],
    logs: [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        text: 'Welcome to ToBeRich! Configure your lobby or roll the 3D dice.',
        color: 'text-emerald-400 font-semibold',
      },
    ],
    chatMessages: [
      {
        id: Date.now() + 1,
        sender: 'Syndicate_System',
        color: '#fbbf24',
        text: `Room #${roomId} is online and ready! Invite friends or click "+ Add Bot".`,
      },
    ],
    centerBanner: {
      title: 'Welcome to ToBeRich!',
      subtitle: 'Roll the 3D dice, click any tile for its 4-sentence guide, or start a Live Auction!',
      type: 'info',
    },
    victoryModalData: null,
  };
}

function addRoomLog(room, text, color = 'text-slate-300') {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  room.logs.unshift({
    id: Date.now() + Math.random(),
    time: timeStr,
    text,
    color,
  });
  if (room.logs.length > 70) {
    room.logs = room.logs.slice(0, 70);
  }
}

function getPublicRoomDirectory() {
  return Object.values(rooms).map((r) => ({
    id: r.id,
    code: r.code,
    name: r.name,
    host: r.hostName,
    map: `${r.mapTheme.toUpperCase()} (${r.boardSize})`,
    theme: r.mapTheme,
    size: r.boardSize,
    playersCount: r.players.length,
    maxPlayers: r.maxPlayers,
    isPrivate: r.isPrivate,
    switchedFromPublic: r.switchedFromPublic,
    teams: r.rules.teamsEnabled,
    botsAllowed: r.allowBots,
    status: r.status,
  }));
}

function broadcastRoomState(roomId, extraEvent = null) {
  const room = rooms[roomId];
  if (!room) return;
  io.to(roomId).emit('roomState', {
    ...room,
    extraEvent,
  });
  io.emit('serverDirectoryUpdate', getPublicRoomDirectory());
}

// ==========================================
// CORE GAME RULES & LOGIC
// ==========================================
function ownsFullCountry(room, playerId, countryCode) {
  if (!countryCode || countryCode === 'AIR') return false;
  const countryTiles = room.boardTiles.filter((t) => t.type === 'property' && t.country === countryCode);
  if (countryTiles.length === 0) return false;
  return countryTiles.every((t) => room.ownership[t.id]?.ownerId === playerId && !room.ownership[t.id]?.mortgaged);
}

function canBuildOnTile(room, playerId, tileId) {
  const tile = room.boardTiles.find((t) => t.id === Number(tileId));
  const prop = room.ownership[tileId];
  const player = room.players.find((p) => p.id === playerId);
  if (!tile || tile.type !== 'property' || !prop || prop.ownerId !== playerId || !player || player.bankrupt) {
    return false;
  }
  if (prop.mortgaged || (prop.houses || 0) >= 5) return false;
  if (player.cash < tile.houseCost) return false;

  if (!room.rules.singleTileBuild) {
    if (!ownsFullCountry(room, playerId, tile.country)) return false;
    const countryTiles = room.boardTiles.filter((t) => t.type === 'property' && t.country === tile.country);
    const minHouses = Math.min(...countryTiles.map((t) => room.ownership[t.id]?.houses || 0));
    if ((prop.houses || 0) > minHouses) return false;
  }
  return true;
}

function calculateRent(room, tile) {
  const prop = room.ownership[tile.id];
  if (!prop || prop.mortgaged) return 0;

  if (tile.type === 'airport') {
    const ownedAirports = room.boardTiles.filter(
      (t) => t.type === 'airport' && room.ownership[t.id]?.ownerId === prop.ownerId && !room.ownership[t.id]?.mortgaged
    ).length;
    return tile.rent[Math.max(0, ownedAirports - 1)] || 40;
  }

  if (tile.type === 'property') {
    const houses = prop.houses || 0;
    if (houses > 0) return tile.rent[houses];
    const hasMonopoly = ownsFullCountry(room, prop.ownerId, tile.country);
    return hasMonopoly && room.rules.doubleMonopolyRent ? tile.rent[0] * 2 : tile.rent[0];
  }
  return 0;
}

function getPlayerNetWorth(room, playerId) {
  const p = room.players.find((pl) => pl.id === playerId);
  if (!p || p.bankrupt) return 0;
  let assets = Math.max(0, p.cash);
  Object.entries(room.ownership).forEach(([tileId, data]) => {
    if (data.ownerId === playerId) {
      const t = room.boardTiles.find((bt) => bt.id === Number(tileId));
      if (t) {
        assets += data.mortgaged ? Math.floor(t.price / 2) : t.price;
        assets += (data.houses || 0) * (t.houseCost || 0);
      }
    }
  });
  return assets;
}

function recordProgressionSnapshot(room, labelOverride = null) {
  const nextStep = room.gameProgression.length;
  const nwMap = {};
  const cashMap = {};

  room.matchParticipants.forEach((part) => {
    const activePl = room.players.find((p) => p.id === part.id);
    if (!activePl || activePl.bankrupt || part.status !== 'active') {
      nwMap[part.id] = 0;
      cashMap[part.id] = 0;
    } else {
      nwMap[part.id] = getPlayerNetWorth(room, part.id);
      cashMap[part.id] = Math.max(0, activePl.cash);
    }
  });

  room.gameProgression.push({
    turn: nextStep,
    label: labelOverride || `T${nextStep}`,
    netWorth: nwMap,
    cash: cashMap,
  });
}

async function saveWinnerRewardToSupabase(winner, earnedDiamond, earnedCoins, matchRecord) {
  if (!supabase || !winner) return;
  try {
    if (winner.userId) {
      const { data: existing } = await supabase
        .from('profiles')
        .select('coins, diamonds, games_played, games_won')
        .eq('id', winner.userId)
        .single();

      if (existing) {
        await supabase
          .from('profiles')
          .update({
            coins: (existing.coins || 0) + earnedCoins,
            diamonds: (existing.diamonds || 0) + (earnedDiamond ? 1 : 0),
            games_played: (existing.games_played || 0) + 1,
            games_won: (existing.games_won || 0) + 1,
          })
          .eq('id', winner.userId);
      }
    }
    await supabase.from('match_history').insert([
      {
        winner_name: winner.name,
        map_name: matchRecord.mapName,
        duration: matchRecord.duration,
        earned_diamond: earnedDiamond,
        players_snap: matchRecord.playersSnap,
        progression: matchRecord.progression,
      },
    ]);
  } catch (err) {
    console.error('Supabase reward update error:', err.message);
  }
}

function triggerRoomVictory(room, winner) {
  if (!room || room.status === 'FINISHED') return;
  room.status = 'FINISHED';

  const earnedDiamond = room.matchSeconds >= 600;
  const earnedCoins = 120;

  const finalPlayers = room.matchParticipants.map((part) => {
    const livePl = room.players.find((p) => p.id === part.id);
    const isEliminated = !livePl || livePl.bankrupt || part.status !== 'active';
    return {
      id: part.id,
      name: part.name,
      charId: part.charId,
      color: part.color,
      status: isEliminated ? part.status || 'bankrupt' : 'active',
      finalNetWorth: isEliminated ? 0 : getPlayerNetWorth(room, part.id),
      finalCash: isEliminated ? 0 : Math.max(0, livePl.cash),
    };
  });

  finalPlayers.sort((a, b) => {
    if (a.name === winner?.name) return -1;
    if (b.name === winner?.name) return 1;
    return b.finalNetWorth - a.finalNetWorth;
  });
  finalPlayers.forEach((fp, i) => {
    fp.rank = i + 1;
  });

  recordProgressionSnapshot(room, 'End');

  const mins = Math.floor(room.matchSeconds / 60);
  const rem = room.matchSeconds % 60;
  const durationStr = `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;

  const matchRecord = {
    id: `m_${Date.now()}`,
    date: new Date().toISOString().slice(0, 16).replace('T', ' '),
    mapName: `${room.mapTheme.toUpperCase()} (${room.boardTiles.length})`,
    duration: durationStr,
    winnerName: winner?.name || room.hostName,
    earnedDiamond,
    playersSnap: finalPlayers,
    progression: room.gameProgression,
  };

  room.victoryModalData = {
    winnerName: winner?.name || room.hostName,
    winnerCharId: winner?.charId || 'blob_amber',
    durationSec: room.matchSeconds,
    earnedDiamond,
    earnedCoins,
    matchRecord,
  };

  addRoomLog(room, `🏆 VICTORY! ${winner?.name} won the match!`, 'text-amber-300 font-black');
  saveWinnerRewardToSupabase(winner, earnedDiamond, earnedCoins, matchRecord);
  broadcastRoomState(room.id, { type: 'VICTORY', winnerName: winner?.name });
}

function handlePlayerBankruptcy(room, playerId, creditorId = null, isVoluntary = false) {
  const target = room.players.find((p) => p.id === playerId);
  if (!target || target.bankrupt) return;
  if (!isVoluntary && target.cash >= 0) return;

  target.cash = 0;
  target.bankrupt = true;

  const participant = room.matchParticipants.find((mp) => mp.id === playerId);
  if (participant) {
    participant.status = 'bankrupt';
  }

  // Transfer or release properties
  Object.keys(room.ownership).forEach((tid) => {
    if (room.ownership[tid].ownerId === playerId) {
      if (creditorId !== null) {
        room.ownership[tid] = { ...room.ownership[tid], ownerId: creditorId, houses: 0 };
      } else {
        delete room.ownership[tid];
      }
    }
  });

  if (target.isBot) {
    addRoomLog(
      room,
      `🤖🥾 ${target.name} went BANKRUPT and was removed from the table!`,
      'text-rose-400 font-black'
    );
    room.centerBanner = {
      title: `🤖🥾 ${target.name} Bankrupt & Kicked!`,
      subtitle: 'Bankrupt bots are removed from active play (kept on post-game chart).',
      type: 'danger',
    };
  } else {
    addRoomLog(room, `💥 ${target.name} declared BANKRUPTCY!`, 'text-rose-500 font-bold');
    room.centerBanner = {
      title: `🏳️ ${target.name} Declared Bankruptcy!`,
      subtitle: 'All properties have been forfeited.',
      type: 'danger',
    };
  }

  recordProgressionSnapshot(room, `💀${target.name.slice(0, 4)}`);

  const alivePlayers = room.players.filter((p) => !p.bankrupt);
  if (alivePlayers.length === 1 && room.players.length > 1) {
    triggerRoomVictory(room, alivePlayers[0]);
    return;
  }
  if (alivePlayers.length === 0) {
    triggerRoomVictory(room, target);
    return;
  }

  const currentPl = room.players[room.currentTurnIndex];
  if (!currentPl || currentPl.id === playerId || currentPl.bankrupt) {
    advanceTurnToNextPlayer(room, true);
  } else {
    broadcastRoomState(room.id);
  }
}

function advanceTurnToNextPlayer(room, forceNext = false) {
  if (!room || room.status !== 'PLAYING') return;

  recordProgressionSnapshot(room);

  const currentPl = room.players[room.currentTurnIndex];
  if (!forceNext && room.hasBonusRoll && currentPl && !currentPl.inJail && !currentPl.bankrupt) {
    room.hasBonusRoll = false;
    room.turnPhase = 'ROLL';
    room.turnTimerSec = 45;
    room.centerBanner = {
      title: `Bonus Roll (${currentPl.name})!`,
      subtitle: 'Rolled doubles – roll the dice again!',
      type: 'info',
    };
    broadcastRoomState(room.id);
    scheduleBotActionIfNeeded(room);
    return;
  }

  const alivePlayers = room.players.filter((p) => !p.bankrupt);
  if (alivePlayers.length === 1 && room.players.length > 1) {
    triggerRoomVictory(room, alivePlayers[0]);
    return;
  }

  let nextIdx = (room.currentTurnIndex + 1) % room.players.length;
  let safety = 0;
  while (room.players[nextIdx]?.bankrupt && safety < room.players.length + 2) {
    nextIdx = (nextIdx + 1) % room.players.length;
    safety++;
  }

  room.currentTurnIndex = nextIdx;
  room.doublesCount = 0;
  room.hasBonusRoll = false;
  room.pendingRent = null;
  room.turnPhase = 'ROLL';
  room.turnTimerSec = 45;

  const nextPlayer = room.players[nextIdx];
  room.centerBanner = {
    title: `Turn: ${nextPlayer?.name || 'Player'}`,
    subtitle: nextPlayer?.isBot
      ? 'Bot is evaluating the board...'
      : 'Your turn! Roll the dice or upgrade your cities.',
    type: 'info',
  };

  broadcastRoomState(room.id);
  scheduleBotActionIfNeeded(room);
}

function executeRentPayment(room, payerId, ownerId, rentAmount, tileName) {
  const payer = room.players.find((p) => p.id === payerId);
  const owner = room.players.find((p) => p.id === ownerId);
  if (!payer || !owner) return;

  payer.cash -= rentAmount;
  owner.cash += rentAmount;

  addRoomLog(room, `🏨 ${payer.name} pays $${rentAmount} rent to ${owner.name} (${tileName}).`, 'text-amber-400');
  room.centerBanner = {
    title: `Rent Paid: -$${rentAmount}`,
    subtitle: `${payer.name} paid $${rentAmount} to ${owner.name} at ${tileName}.`,
    type: 'danger',
  };
  room.pendingRent = null;
  room.turnPhase = 'END';

  if (payer.cash < 0) {
    handlePlayerBankruptcy(room, payer.id, owner.id);
  } else {
    broadcastRoomState(room.id, {
      type: 'CASH_DELTA',
      deltas: [
        { playerId: payer.id, amount: -rentAmount },
        { playerId: owner.id, amount: rentAmount },
      ],
    });
    scheduleBotActionIfNeeded(room);
  }
}

function startAuctionForTile(room, tile) {
  const startBid = Math.max(10, Math.floor(tile.price * 0.25));
  room.turnPhase = 'AUCTION';
  room.auctionState = {
    tile,
    currentBid: startBid,
    highestBidderId: null,
    timeLeft: 7,
    foldedIds: [],
  };
  addRoomLog(
    room,
    `🔨 Live Auction started for ${tile.name} (Value: $${tile.price}, Opening bid: $${startBid})!`,
    'text-amber-300 font-bold'
  );
  broadcastRoomState(room.id, { type: 'AUCTION_START', tile });
}

function finalizeAuction(room) {
  if (!room || !room.auctionState) return;
  const { highestBidderId, tile, currentBid } = room.auctionState;

  if (highestBidderId !== null) {
    const winner = room.players.find((p) => p.id === highestBidderId);
    if (winner && winner.cash >= currentBid) {
      winner.cash -= currentBid;
      room.ownership[tile.id] = { ownerId: winner.id, houses: 0, mortgaged: false };
      addRoomLog(room, `🔨 SOLD! ${winner.name} won the auction for ${tile.name} at $${currentBid}!`, 'text-emerald-400 font-bold');
      room.centerBanner = {
        title: `🔨 Auction Won by ${winner.name}!`,
        subtitle: `${tile.name} sold for $${currentBid}.`,
        type: 'success',
      };
    }
  } else {
    addRoomLog(room, `🔨 Auction for ${tile.name} ended with no bids.`, 'text-slate-400');
    room.centerBanner = {
      title: 'Auction Ended – No Bids',
      subtitle: `${tile.name} remains unowned.`,
      type: 'info',
    };
  }

  room.auctionState = null;
  room.turnPhase = 'END';
  broadcastRoomState(room.id, { type: 'AUCTION_END' });
  scheduleBotActionIfNeeded(room);
}

function evaluateLanding(room, player) {
  const tiles = room.boardTiles;
  const tile = tiles[player.position];
  if (!player || !tile) return;

  const jailTileIndex = Math.floor(tiles.length / 4);

  if (tile.type === 'start') {
    if (room.rules.doubleOnStart) {
      player.cash += 200;
      addRoomLog(room, `🎯 ${player.name} landed directly on START for an extra +$200 ($400 total)!`, 'text-emerald-400 font-bold');
    }
    room.centerBanner = {
      title: `${player.name} on START!`,
      subtitle: room.rules.doubleOnStart ? 'Direct landing bonus: +$400!' : 'Safe corner.',
      type: 'success',
    };
    room.turnPhase = 'END';
    broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
    scheduleBotActionIfNeeded(room);
    return;
  }

  if (tile.type === 'parking') {
    if (room.rules.parkingJackpot && room.parkingPool > 0) {
      const prize = room.parkingPool;
      player.cash += prize;
      room.parkingPool = 0;
      addRoomLog(room, `🏖️ ${player.name} claims the VACATION Jackpot of +$${prize}!`, 'text-amber-400 font-bold');
      room.centerBanner = {
        title: `Vacation Jackpot! +$${prize}`,
        subtitle: `${player.name} collected all accumulated taxes!`,
        type: 'success',
      };
    } else {
      room.centerBanner = {
        title: 'Tropical Vacation',
        subtitle: 'Relaxing free parking corner.',
        type: 'info',
      };
    }
    room.turnPhase = 'END';
    broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
    scheduleBotActionIfNeeded(room);
    return;
  }

  if (tile.type === 'jail') {
    room.centerBanner = {
      title: 'Jail – Just Visiting',
      subtitle: `${player.name} is safely visiting the corner.`,
      type: 'info',
    };
    room.turnPhase = 'END';
    broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
    scheduleBotActionIfNeeded(room);
    return;
  }

  if (tile.type === 'gotojail') {
    player.position = jailTileIndex;
    player.inJail = true;
    player.jailTurns = 0;
    room.hasBonusRoll = false;
    addRoomLog(room, `🚓 ${player.name} is sent directly to JAIL!`, 'text-rose-400 font-semibold');
    room.centerBanner = {
      title: 'Locked in Jail!',
      subtitle: `${player.name} was transported to the Jail cell.`,
      type: 'danger',
    };
    room.turnPhase = 'END';
    broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
    scheduleBotActionIfNeeded(room);
    return;
  }

  if (tile.type === 'tax') {
    const tax = tile.amount || 120;
    player.cash -= tax;
    room.parkingPool += tax;
    addRoomLog(room, `💸 ${player.name} paid ${tile.name}: -$${tax} (added to Vacation pool).`, 'text-rose-400');
    room.centerBanner = {
      title: `${tile.name}: -$${tax}`,
      subtitle: `$${tax} deposited into the Vacation jackpot.`,
      type: 'danger',
    };
    room.turnPhase = 'END';
    if (player.cash < 0) {
      handlePlayerBankruptcy(room, player.id);
    } else {
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
    }
    return;
  }

  if (tile.type === 'casino') {
    if (!player.isBot) {
      room.centerBanner = {
        title: `🎰 Welcome to ${tile.name}!`,
        subtitle: 'Spin the 777 Slots, Fortune Wheel, or Coin Flip!',
        type: 'success',
      };
      room.turnPhase = 'END';
      broadcastRoomState(room.id, { type: 'OPEN_CASINO', tile, playerId: player.id });
    } else {
      const botBet = Math.min(100, Math.max(20, Math.floor(player.cash * 0.1)));
      const winMult = [0, 0, 1.5, 2, 3][Math.floor(Math.random() * 5)];
      const net = Math.round(botBet * winMult) - botBet;
      player.cash += net;
      addRoomLog(
        room,
        net >= 0
          ? `🎰 ${player.name} spun the reels at ${tile.name} and won +$${net}!`
          : `🎰 ${player.name} gambled at ${tile.name} and lost -$${Math.abs(net)}.`,
        net >= 0 ? 'text-emerald-400' : 'text-amber-400'
      );
      room.turnPhase = 'END';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
    }
    return;
  }

  if (tile.type === 'chance') {
    const card = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)];
    addRoomLog(room, `🃏 Chance (${player.name}): "${card.title}" – ${card.text}`, 'text-amber-300');
    room.centerBanner = {
      title: `Chance: ${card.title}`,
      subtitle: card.text,
      type: card.action === 'money' || card.action === 'move' ? 'success' : 'danger',
    };

    if (card.action === 'money') {
      player.cash += card.amount;
    } else if (card.action === 'tax') {
      player.cash -= card.amount;
      room.parkingPool += card.amount;
    } else if (card.action === 'jail') {
      player.position = jailTileIndex;
      player.inJail = true;
      player.jailTurns = 0;
      room.hasBonusRoll = false;
    } else if (card.action === 'move') {
      player.position = 0;
      player.cash += 200;
    }

    room.turnPhase = 'END';
    if (player.cash < 0) {
      handlePlayerBankruptcy(room, player.id);
    } else {
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
    }
    return;
  }

  if (tile.type === 'property' || tile.type === 'airport') {
    const propOwnerData = room.ownership[tile.id];

    if (!propOwnerData) {
      room.centerBanner = {
        title: `${tile.name} (${tile.countryName}) is Available!`,
        subtitle: `Price: $${tile.price} | Base Rent: $${tile.rent[0]} | Buy or Start Live Auction!`,
        type: 'info',
      };
      room.turnPhase = 'ACTION';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
      return;
    }

    if (propOwnerData.ownerId === player.id) {
      room.centerBanner = {
        title: `${tile.name} (Owned by ${player.name})`,
        subtitle: 'You can upgrade houses in the right panel.',
        type: 'success',
      };
      room.turnPhase = 'END';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
      return;
    }

    const owner = room.players.find((p) => p.id === propOwnerData.ownerId);

    if (room.rules.teamsEnabled && owner && owner.team === player.team) {
      addRoomLog(
        room,
        `🤝 ${player.name} landed on teammate ${owner.name}'s ${tile.name} – $0 Team Alliance stay!`,
        'text-cyan-300 font-bold'
      );
      room.centerBanner = {
        title: `🤝 Teammate Property (${owner.name})`,
        subtitle: 'Team alliance benefit – $0 rent charged!',
        type: 'success',
      };
      room.turnPhase = 'END';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
      return;
    }

    if (propOwnerData.mortgaged) {
      room.centerBanner = {
        title: `${tile.name} (Mortgaged)`,
        subtitle: `Owned by ${owner?.name}, currently mortgaged – $0 rent.`,
        type: 'info',
      };
      room.turnPhase = 'END';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
      return;
    }

    if (owner?.inJail && !room.rules.rentInJail) {
      addRoomLog(
        room,
        `🔒 ${player.name} landed on ${tile.name}, but owner (${owner.name}) is in JAIL – $0 rent!`,
        'text-cyan-400 font-semibold'
      );
      room.centerBanner = {
        title: `$0 Rent! (${owner.name} is Handcuffed in Jail)`,
        subtitle: 'Jail Rent is disabled – you pay nothing!',
        type: 'success',
      };
      room.turnPhase = 'END';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      scheduleBotActionIfNeeded(room);
      return;
    }

    const rentAmount = calculateRent(room, tile);

    if (room.gameMode === 'gambling' && !player.isBot) {
      room.pendingRent = {
        payerId: player.id,
        ownerId: propOwnerData.ownerId,
        amount: rentAmount,
        tileName: tile.name,
      };
      room.centerBanner = {
        title: `Rent Due: $${rentAmount} to ${owner?.name}`,
        subtitle: 'Pay normally or risk a 50/50 Coin Flip ($0 or 2x rent)!',
        type: 'danger',
      };
      room.turnPhase = 'RENT_DECISION';
      broadcastRoomState(room.id, { type: 'TILE_LAND', tile, playerId: player.id });
      return;
    }

    executeRentPayment(room, player.id, propOwnerData.ownerId, rentAmount, tile.name);
  }
}

function performRollDice(room) {
  if (!room || room.status !== 'PLAYING' || room.turnPhase !== 'ROLL') return;
  const player = room.players[room.currentTurnIndex];
  if (!player || player.bankrupt) return;

  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  const sum = d1 + d2;
  const isDoubles = d1 === d2;
  const totalTiles = room.boardTiles.length;
  const jailTileIndex = Math.floor(totalTiles / 4);

  room.dice = [d1, d2];

  if (player.inJail) {
    if (isDoubles) {
      player.inJail = false;
      player.jailTurns = 0;
      room.hasBonusRoll = false;
      addRoomLog(room, `🎲 ${player.name} rolled DOUBLES (${d1}+${d2}) and escaped Jail!`, 'text-emerald-400 font-semibold');
    } else {
      const nextJailTurns = (player.jailTurns || 0) + 1;
      if (nextJailTurns >= 3) {
        player.inJail = false;
        player.jailTurns = 0;
        player.cash -= 50;
        room.parkingPool += 50;
        addRoomLog(room, `🔓 ${player.name} paid $50 bail after 3 attempts and left Jail.`, 'text-amber-400');
      } else {
        player.jailTurns = nextJailTurns;
        addRoomLog(room, `🔒 ${player.name} rolled ${d1}+${d2} (no doubles) and stays in Jail (${nextJailTurns}/3).`, 'text-slate-400');
        room.centerBanner = {
          title: 'No Doubles – Still in Jail',
          subtitle: `Rolled ${d1} and ${d2}. Pay $50 bail next turn or try again.`,
          type: 'danger',
        };
        room.turnPhase = 'END';
        broadcastRoomState(room.id, { type: 'DICE_ROLLED', dice: [d1, d2], sum, isDoubles, stayedInJail: true });
        scheduleBotActionIfNeeded(room);
        return;
      }
    }
  } else {
    if (isDoubles) {
      const nextDoubles = (room.doublesCount || 0) + 1;
      if (nextDoubles >= 3) {
        player.position = jailTileIndex;
        player.inJail = true;
        player.jailTurns = 0;
        room.doublesCount = 0;
        room.hasBonusRoll = false;
        addRoomLog(room, `🚓 ${player.name} rolled 3 DOUBLES in a row and goes to JAIL!`, 'text-rose-400 font-semibold');
        room.centerBanner = {
          title: '3x Doubles! Speeding to Jail!',
          subtitle: 'Caught speeding across the board.',
          type: 'danger',
        };
        room.turnPhase = 'END';
        broadcastRoomState(room.id, { type: 'DICE_ROLLED', dice: [d1, d2], sum, isDoubles, speedingJail: true });
        scheduleBotActionIfNeeded(room);
        return;
      }
      room.doublesCount = nextDoubles;
      room.hasBonusRoll = true;
      addRoomLog(room, `🎲 ${player.name} rolled DOUBLES ${d1} + ${d2} = ${sum}! (Bonus roll unlocked)`, 'text-cyan-400 font-medium');
    } else {
      room.doublesCount = 0;
      room.hasBonusRoll = false;
      addRoomLog(room, `🎲 ${player.name} rolled ${d1} + ${d2} = ${sum}.`, 'text-slate-300');
    }
  }

  const oldPos = player.position;
  const newPos = (oldPos + sum) % totalTiles;
  const passedStart = oldPos + sum >= totalTiles && newPos !== 0;

  if (passedStart || newPos === 0) {
    player.cash += 200;
    addRoomLog(room, `💵 ${player.name} passed START and collected +$200!`, 'text-emerald-400');
  }

  player.position = newPos;
  broadcastRoomState(room.id, {
    type: 'PLAYER_MOVED',
    playerId: player.id,
    from: oldPos,
    to: newPos,
    steps: sum,
    dice: [d1, d2],
    isDoubles,
  });

  evaluateLanding(room, player);
}

function performBuyProperty(room, player) {
  const tile = room.boardTiles[player.position];
  if (!tile || room.ownership[tile.id] || player.cash < tile.price) return;

  player.cash -= tile.price;
  room.ownership[tile.id] = { ownerId: player.id, houses: 0, mortgaged: false };

  addRoomLog(room, `🏠 ${player.name} bought ${tile.name} (${tile.countryName || 'Hub'}) for $${tile.price}!`, 'text-emerald-400 font-semibold');
  room.centerBanner = {
    title: `Purchased ${tile.name}!`,
    subtitle: room.rules.singleTileBuild
      ? 'Single-Tile Build is ON: You can build houses on this tile right now!'
      : `${player.name} acquired the deed for $${tile.price}.`,
    type: 'success',
  };
  room.turnPhase = 'END';

  broadcastRoomState(room.id, {
    type: 'DEED_PURCHASED',
    tile,
    buyerName: player.name,
    buyerColor: player.color,
  });
  scheduleBotActionIfNeeded(room);
}

function performDeclinePurchase(room) {
  const player = room.players[room.currentTurnIndex];
  const tile = room.boardTiles[player?.position];
  if (!tile) {
    room.turnPhase = 'END';
    broadcastRoomState(room.id);
    return;
  }
  if (room.rules.auctionsEnabled) {
    startAuctionForTile(room, tile);
  } else {
    room.turnPhase = 'END';
    broadcastRoomState(room.id);
    scheduleBotActionIfNeeded(room);
  }
}

function performBuildHouse(room, playerId, tileId) {
  if (!canBuildOnTile(room, playerId, tileId)) return false;
  const tile = room.boardTiles.find((t) => t.id === Number(tileId));
  const prop = room.ownership[tileId];
  const player = room.players.find((p) => p.id === playerId);

  const nextHouses = (prop.houses || 0) + 1;
  player.cash -= tile.houseCost;
  prop.houses = nextHouses;

  const label = nextHouses === 5 ? 'a HOTEL 🏨' : `House #${nextHouses} 🏠`;
  addRoomLog(room, `🔨 ${player.name} built ${label} in ${tile.name} (-$${tile.houseCost}).`, 'text-cyan-400');
  broadcastRoomState(room.id, { type: 'HOUSE_BUILT', tileId, houses: nextHouses });
  return true;
}

// ==========================================
// BOT AI SCHEDULER
// ==========================================
function scheduleBotActionIfNeeded(room) {
  if (!room || room.status !== 'PLAYING') return;
  const activePlayer = room.players[room.currentTurnIndex];
  if (!activePlayer || !activePlayer.isBot || activePlayer.bankrupt || room.turnPhase === 'AUCTION') return;

  setTimeout(() => {
    if (room.status !== 'PLAYING') return;
    const currentNow = room.players[room.currentTurnIndex];
    if (!currentNow || currentNow.id !== activePlayer.id || currentNow.bankrupt) return;

    if (room.turnPhase === 'ROLL') {
      if (currentNow.inJail && currentNow.cash >= 250) {
        currentNow.inJail = false;
        currentNow.jailTurns = 0;
        currentNow.cash -= 50;
        room.parkingPool += 50;
        addRoomLog(room, `🔓 ${currentNow.name} paid $50 bail and is free from Jail!`, 'text-emerald-400');
      }
      performRollDice(room);
    } else if (room.turnPhase === 'ACTION') {
      const tile = room.boardTiles[currentNow.position];
      if (tile && !room.ownership[tile.id] && currentNow.cash >= tile.price + 60) {
        performBuyProperty(room, currentNow);
      } else {
        performDeclinePurchase(room);
      }
    } else if (room.turnPhase === 'END') {
      const botProps = Object.entries(room.ownership)
        .filter(([_, data]) => data.ownerId === currentNow.id && !data.mortgaged && (data.houses || 0) < 5)
        .map(([tid]) => room.boardTiles.find((t) => t.id === Number(tid)))
        .filter((t) => t && t.type === 'property');

      for (const propTile of botProps) {
        if (currentNow.cash >= propTile.houseCost + 220 && canBuildOnTile(room, currentNow.id, propTile.id)) {
          performBuildHouse(room, currentNow.id, propTile.id);
          break;
        }
      }
      advanceTurnToNextPlayer(room);
    }
  }, room.rules.botSpeedMs || 850);
}

// ==========================================
// 1-SECOND INTERVAL TICKER
// ==========================================
setInterval(() => {
  Object.values(rooms).forEach((room) => {
    if (room.status !== 'PLAYING') return;

    room.matchSeconds += 1;

    // Auction ticker
    if (room.turnPhase === 'AUCTION' && room.auctionState) {
      const auc = room.auctionState;
      const activeBots = room.players.filter(
        (p) =>
          p.isBot &&
          !p.bankrupt &&
          !auc.foldedIds.includes(p.id) &&
          p.id !== auc.highestBidderId &&
          p.cash >= auc.currentBid + 20
      );

      const maxBotWilling = Math.round(auc.tile.price * 1.1);
      if (activeBots.length > 0 && auc.currentBid < maxBotWilling && Math.random() < 0.6) {
        const bidder = activeBots[Math.floor(Math.random() * activeBots.length)];
        const increment = auc.currentBid < 120 ? 10 : 20;
        const nextBid = auc.currentBid + increment;
        if (bidder.cash >= nextBid) {
          auc.currentBid = nextBid;
          auc.highestBidderId = bidder.id;
          auc.timeLeft = 5;
          broadcastRoomState(room.id);
          return;
        }
      }

      auc.timeLeft -= 1;
      if (auc.timeLeft <= 0) {
        finalizeAuction(room);
      } else {
        broadcastRoomState(room.id);
      }
      return;
    }

    // Turn timer
    if (room.turnTimerSec > 0) {
      room.turnTimerSec -= 1;
      if (room.turnTimerSec === 0) {
        const activePl = room.players[room.currentTurnIndex];
        addRoomLog(room, `⏰ Time expired for ${activePl?.name}! Auto-completing turn...`, 'text-amber-400');
        if (room.turnPhase === 'ROLL') {
          performRollDice(room);
        } else if (room.turnPhase === 'ACTION') {
          performDeclinePurchase(room);
        } else if (room.turnPhase === 'RENT_DECISION' && room.pendingRent) {
          executeRentPayment(
            room,
            room.pendingRent.payerId,
            room.pendingRent.ownerId,
            room.pendingRent.amount,
            room.pendingRent.tileName
          );
        } else {
          advanceTurnToNextPlayer(room, true);
        }
      }
    }
  });
}, 1000);

// Default public rooms
rooms['pub-104'] = createDefaultRoom('pub-104', 'Viktor_VIP', false);
rooms['pub-104'].name = 'World Blitz #104 (Fast Economy)';
rooms['team-88'] = createDefaultRoom('team-88', 'Elena_Pro', false);
rooms['team-88'].name = '2v2 Team Alliance Championship';
rooms['team-88'].rules.teamsEnabled = true;

// ==========================================
// SOCKET.IO EVENT HANDLERS
// ==========================================
io.on('connection', (socket) => {
  socket.emit('serverDirectoryUpdate', getPublicRoomDirectory());

  socket.on('joinRoom', ({ roomId, username, charId, isPrivate }) => {
    const cleanRoomId = (roomId || 'tbR-904').trim();
    const cleanName = (username || 'Alex_VIP').trim().slice(0, 18);
    const chosenChar = CHARACTERS.find((c) => c.id === charId) || CHARACTERS[1];

    if (!rooms[cleanRoomId]) {
      rooms[cleanRoomId] = createDefaultRoom(cleanRoomId, cleanName, isPrivate !== undefined ? isPrivate : true);
    }

    const room = rooms[cleanRoomId];
    socket.join(cleanRoomId);
    socket.data.roomId = cleanRoomId;

    let existingPlayer = room.players.find((p) => p.socketId === socket.id || (!p.isBot && p.name === cleanName));

    if (existingPlayer) {
      existingPlayer.socketId = socket.id;
      existingPlayer.charId = chosenChar.id;
      existingPlayer.color = chosenChar.color;
    } else if (room.players.length < room.maxPlayers) {
      const newId = room.players.length > 0 ? Math.max(...room.players.map((p) => p.id)) + 1 : 0;
      const teamId = room.players.length % 2 === 0 ? 'A' : 'B';
      const newPlayer = {
        id: newId,
        socketId: socket.id,
        name: cleanName,
        isBot: false,
        charId: chosenChar.id,
        color: chosenChar.color,
        team: teamId,
        cash: room.rules.startingCash,
        position: 0,
        inJail: false,
        jailTurns: 0,
        bankrupt: false,
      };
      room.players.push(newPlayer);
      room.matchParticipants.push({
        id: newPlayer.id,
        name: newPlayer.name,
        isBot: false,
        charId: newPlayer.charId,
        color: newPlayer.color,
        team: newPlayer.team,
        status: 'active',
      });
      addRoomLog(room, `👋 ${cleanName} joined room #${cleanRoomId}!`, 'text-emerald-400 font-bold');
    }

    broadcastRoomState(cleanRoomId);
  });

  socket.on('updateRoomSettings', ({ roomId, settings }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || !settings) return;

    if (settings.isPrivate !== undefined) {
      if (!room.isPrivate && settings.isPrivate) {
        room.switchedFromPublic = true;
      }
      room.isPrivate = Boolean(settings.isPrivate);
    }
    if (settings.maxPlayers !== undefined) {
      room.maxPlayers = Math.min(8, Math.max(2, Number(settings.maxPlayers)));
      if (room.status === 'LOBBY' && room.players.length > room.maxPlayers) {
        room.players = room.players.slice(0, room.maxPlayers);
      }
    }
    if (settings.mapTheme !== undefined) room.mapTheme = settings.mapTheme;
    if (settings.boardSize !== undefined) room.boardSize = Number(settings.boardSize);
    if (settings.gameMode !== undefined) room.gameMode = settings.gameMode;
    if (settings.customTiles !== undefined) room.customTiles = settings.customTiles;
    if (settings.rules) {
      room.rules = { ...room.rules, ...settings.rules };
    }

    room.boardTiles = generateBoardTiles(room.boardSize, room.mapTheme, room.gameMode, room.customTiles);
    broadcastRoomState(room.id);
  });

  socket.on('updatePlayerAppearance', ({ roomId, username, charId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pl = room.players.find((p) => p.socketId === socket.id);
    const ch = CHARACTERS.find((c) => c.id === charId);
    if (pl) {
      if (username) pl.name = username.trim().slice(0, 18);
      if (ch) {
        pl.charId = ch.id;
        pl.color = ch.color;
      }
      broadcastRoomState(room.id);
    }
  });

  socket.on('addBot', ({ roomId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || room.players.length >= room.maxPlayers) return;

    const usedNames = room.players.map((p) => p.name);
    const pick = BOT_POOL.find((b) => !usedNames.includes(b.name)) || BOT_POOL[room.players.length % BOT_POOL.length];
    const newId = room.players.length > 0 ? Math.max(...room.players.map((p) => p.id)) + 1 : 1;
    const teamId = room.players.length % 2 === 0 ? 'A' : 'B';

    const newBot = {
      id: newId,
      socketId: null,
      name: pick.name,
      isBot: true,
      charId: pick.charId,
      color: pick.color,
      team: teamId,
      cash: room.rules.startingCash,
      position: 0,
      inJail: false,
      jailTurns: 0,
      bankrupt: false,
    };

    room.allowBots = true;
    room.players.push(newBot);
    room.matchParticipants.push({
      id: newBot.id,
      name: newBot.name,
      isBot: true,
      charId: newBot.charId,
      color: newBot.color,
      team: newBot.team,
      status: 'active',
    });

    addRoomLog(room, `🤖 Added bot ${newBot.name} to the table!`, 'text-sky-400 font-bold');
    broadcastRoomState(room.id);
  });

  socket.on('removePlayerSlot', ({ roomId, targetPlayerId, clearAllBots }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;

    if (clearAllBots) {
      room.players = room.players.filter((p) => !p.isBot);
      room.allowBots = false;
      addRoomLog(room, '🗑️ Removed all bots from the room.', 'text-rose-300');
    } else if (targetPlayerId !== undefined) {
      room.players = room.players.filter((p) => p.id !== targetPlayerId);
    }
    broadcastRoomState(room.id);
  });

  socket.on('startGame', ({ roomId, mapTheme, boardSize, gameMode, customTiles }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;

    if (mapTheme) room.mapTheme = mapTheme;
    if (boardSize) room.boardSize = Number(boardSize);
    if (gameMode) room.gameMode = gameMode;
    if (customTiles) room.customTiles = customTiles;

    room.boardTiles = generateBoardTiles(room.boardSize, room.mapTheme, room.gameMode, room.customTiles);
    room.status = 'PLAYING';
    room.ownership = {};
    room.doublesCount = 0;
    room.hasBonusRoll = false;
    room.parkingPool = 150;
    room.pendingRent = null;
    room.auctionState = null;
    room.victoryModalData = null;
    room.matchSeconds = 0;
    room.turnTimerSec = 45;

    room.players.forEach((p, idx) => {
      p.cash = room.rules.startingCash;
      p.position = 0;
      p.inJail = false;
      p.jailTurns = 0;
      p.bankrupt = false;
      p.team = idx % 2 === 0 ? 'A' : 'B';
    });

    room.matchParticipants = room.players.map((p) => ({
      id: p.id,
      name: p.name,
      isBot: p.isBot,
      charId: p.charId,
      color: p.color,
      team: p.team,
      status: 'active',
    }));

    room.gameProgression = [];
    recordProgressionSnapshot(room, 'Start');

    const chosenStartIdx = Math.floor(Math.random() * Math.max(1, room.players.length));
    room.currentTurnIndex = chosenStartIdx;
    room.turnPhase = 'ROLL';

    const starter = room.players[chosenStartIdx];
    addRoomLog(room, `🎰 Random Starter Roulette selected ${starter?.name} to roll first!`, 'text-amber-300 font-bold');
    room.centerBanner = {
      title: `🎲 ${starter?.name} Goes First!`,
      subtitle: `Randomly selected at the start of the match • Board: ${room.boardTiles.length} tiles`,
      type: 'success',
    };

    broadcastRoomState(room.id, {
      type: 'GAME_STARTED',
      starterIndex: chosenStartIdx,
      starterName: starter?.name,
    });

    setTimeout(() => {
      scheduleBotActionIfNeeded(room);
    }, 1800);
  });

  socket.on('rollDice', ({ roomId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    performRollDice(room);
  });

  socket.on('payBail', ({ roomId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const player = room.players[room.currentTurnIndex];
    if (!player || !player.inJail || player.cash < 50) return;

    player.inJail = false;
    player.jailTurns = 0;
    player.cash -= 50;
    room.parkingPool += 50;

    addRoomLog(room, `🔓 ${player.name} paid $50 bail and is free from Jail!`, 'text-emerald-400');
    room.centerBanner = {
      title: 'Bail Paid ($50)!',
      subtitle: 'You are free! Roll the dice to move.',
      type: 'success',
    };
    broadcastRoomState(room.id);
  });

  socket.on('buyProperty', ({ roomId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || room.turnPhase !== 'ACTION') return;
    const player = room.players[room.currentTurnIndex];
    if (!player) return;
    performBuyProperty(room, player);
  });

  socket.on('declinePurchase', ({ roomId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || room.turnPhase !== 'ACTION') return;
    performDeclinePurchase(room);
  });

  socket.on('placeAuctionBid', ({ roomId, playerId, amountToAdd }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || room.turnPhase !== 'AUCTION' || !room.auctionState) return;

    const bidder =
      room.players.find((p) => p.id === playerId) ||
      room.players.find((p) => p.socketId === socket.id) ||
      room.players[0];
    if (!bidder || bidder.bankrupt) return;

    const nextBid =
      room.auctionState.highestBidderId === null
        ? room.auctionState.currentBid
        : room.auctionState.currentBid + Number(amountToAdd || 10);

    if (bidder.cash < nextBid) return;

    room.auctionState.currentBid = nextBid;
    room.auctionState.highestBidderId = bidder.id;
    room.auctionState.timeLeft = 6;
    broadcastRoomState(room.id);
  });

  socket.on('foldAuction', ({ roomId, playerId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || room.turnPhase !== 'AUCTION' || !room.auctionState) return;
    const pid = playerId !== undefined ? playerId : room.players.find((p) => p.socketId === socket.id)?.id ?? 0;
    if (!room.auctionState.foldedIds.includes(pid)) {
      room.auctionState.foldedIds.push(pid);
    }
    room.auctionState.timeLeft = Math.min(room.auctionState.timeLeft, 2);
    broadcastRoomState(room.id);
  });

  socket.on('payRentDecision', ({ roomId, gambleCoinFlip }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || !room.pendingRent) return;
    const { payerId, ownerId, amount, tileName } = room.pendingRent;
    const payer = room.players.find((p) => p.id === payerId);

    if (!gambleCoinFlip) {
      executeRentPayment(room, payerId, ownerId, amount, tileName);
      return;
    }

    if (Math.random() < 0.5) {
      addRoomLog(
        room,
        `🪙 ${payer?.name} WON the 50/50 Coin Flip at ${tileName}! Paid $0 instead of $${amount}!`,
        'text-emerald-400 font-bold'
      );
      room.centerBanner = {
        title: '🪙 Heads! You Pay $0 Rent!',
        subtitle: `Lucky flip! You saved $${amount} at ${tileName}.`,
        type: 'success',
      };
      room.pendingRent = null;
      room.turnPhase = 'END';
      broadcastRoomState(room.id);
    } else {
      executeRentPayment(room, payerId, ownerId, amount * 2, tileName);
    }
  });

  socket.on('buildHouse', ({ roomId, tileId, playerId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pid = playerId !== undefined ? playerId : room.players.find((p) => p.socketId === socket.id)?.id ?? 0;
    performBuildHouse(room, pid, Number(tileId));
  });

  socket.on('sellHouse', ({ roomId, tileId, playerId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pid = playerId !== undefined ? playerId : room.players.find((p) => p.socketId === socket.id)?.id ?? 0;
    const tile = room.boardTiles.find((t) => t.id === Number(tileId));
    const prop = room.ownership[tileId];
    const player = room.players.find((p) => p.id === pid);
    if (!tile || !prop || prop.ownerId !== pid || (prop.houses || 0) <= 0 || !player) return;

    const refund = Math.floor(tile.houseCost / 2);
    prop.houses -= 1;
    player.cash += refund;
    addRoomLog(room, `🏚️ ${player.name} sold a building in ${tile.name} for +$${refund}.`, 'text-amber-300');
    broadcastRoomState(room.id);
  });

  socket.on('toggleMortgage', ({ roomId, tileId, playerId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pid = playerId !== undefined ? playerId : room.players.find((p) => p.socketId === socket.id)?.id ?? 0;
    const tile = room.boardTiles.find((t) => t.id === Number(tileId));
    const prop = room.ownership[tileId];
    const player = room.players.find((p) => p.id === pid);
    if (!tile || !prop || prop.ownerId !== pid || (prop.houses || 0) > 0 || !player) return;

    const mortgageVal = Math.floor(tile.price / 2);
    const unmortgageCost = Math.ceil(mortgageVal * 1.1);

    if (!prop.mortgaged) {
      prop.mortgaged = true;
      player.cash += mortgageVal;
      addRoomLog(room, `📜 ${player.name} mortgaged ${tile.name} for +$${mortgageVal}.`, 'text-amber-400');
    } else {
      if (player.cash < unmortgageCost) return;
      prop.mortgaged = false;
      player.cash -= unmortgageCost;
      addRoomLog(room, `🔓 ${player.name} unmortgaged ${tile.name} (-$${unmortgageCost}).`, 'text-emerald-400');
    }
    broadcastRoomState(room.id);
  });

  socket.on('playCasinoGame', ({ roomId, playerId, gameType, betAmount, choice }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pid = playerId !== undefined ? playerId : room.players.find((p) => p.socketId === socket.id)?.id ?? 0;
    const player = room.players.find((p) => p.id === pid);
    const bet = Math.max(10, Number(betAmount || 100));
    if (!player || player.cash < bet) return;

    let resultPayload = {};
    if (gameType === 'slots') {
      const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣'];
      const r1 = symbols[Math.floor(Math.random() * symbols.length)];
      const r2 = symbols[Math.floor(Math.random() * symbols.length)];
      const r3 = symbols[Math.floor(Math.random() * symbols.length)];
      let mult = 0;
      if (r1 === r2 && r2 === r3) mult = r1 === '7️⃣' ? 10 : r1 === '💎' ? 6 : 4;
      else if (r1 === r2 || r2 === r3 || r1 === r3) mult = 2;

      const net = bet * mult - bet;
      player.cash += net;
      resultPayload = {
        gameType: 'slots',
        reels: [r1, r2, r3],
        win: mult > 0,
        net,
        text: mult > 0 ? `🎉 JACKPOT (${r1}${r2}${r3})! Multiplier x${mult} – Profit: +$${net}!` : `No match (${r1}${r2}${r3}). Lost -$${bet}.`,
      };
    } else if (gameType === 'wheel') {
      const segments = [0, 0.5, 0, 1.5, 2, 0, 3, 5];
      const picked = segments[Math.floor(Math.random() * segments.length)];
      const net = Math.round(bet * picked) - bet;
      player.cash += net;
      resultPayload = {
        gameType: 'wheel',
        multiplier: picked,
        win: net > 0,
        net,
        text: net > 0 ? `🎡 Wheel landed on x${picked}! You won +$${net}!` : `🎡 Wheel landed on x${picked}. Net: $${net}.`,
      };
    } else {
      const win = Math.random() < 0.5;
      const net = win ? bet : -bet;
      player.cash += net;
      resultPayload = {
        gameType: 'coin',
        win,
        net,
        text: win ? `🪙 Winner! Landed on ${choice || 'Heads'} (+$${bet})!` : `🪙 Missed! Lost -$${bet}.`,
      };
    }

    addRoomLog(room, `🎰 Casino 777 (${player.name}): ${resultPayload.text}`, resultPayload.win ? 'text-emerald-400' : 'text-amber-400');
    broadcastRoomState(room.id, { type: 'CASINO_RESULT', playerId: player.id, ...resultPayload });
  });

  socket.on('proposeTrade', ({ roomId, fromPlayerId, toPlayerId, myCash, partnerCash, myProps, partnerProps }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pFrom = room.players.find((p) => p.id === Number(fromPlayerId ?? 0));
    const pTo = room.players.find((p) => p.id === Number(toPlayerId));
    if (!pFrom || !pTo) return;

    const cashOffer = Math.max(0, Number(myCash || 0));
    const cashReq = Math.max(0, Number(partnerCash || 0));
    if (pFrom.cash < cashOffer || pTo.cash < cashReq) return;

    const offeredVal = (myProps || []).reduce(
      (acc, tid) => acc + (room.boardTiles.find((bt) => bt.id === Number(tid))?.price || 0) * 1.15,
      0
    );
    const requestedVal = (partnerProps || []).reduce(
      (acc, tid) => acc + (room.boardTiles.find((bt) => bt.id === Number(tid))?.price || 0) * 1.25,
      0
    );
    const totalOffered = offeredVal + cashOffer;
    const totalRequested = requestedVal + cashReq;
    const ratio = totalRequested > 0 ? totalOffered / totalRequested : 2;

    if (pTo.isBot && ratio < 1.0) {
      socket.emit('tradeRejected', { text: `${pTo.name} rejected the offer – add more value!` });
      return;
    }

    pFrom.cash = pFrom.cash - cashOffer + cashReq;
    pTo.cash = pTo.cash - cashReq + cashOffer;

    (myProps || []).forEach((tid) => {
      if (room.ownership[tid]?.ownerId === pFrom.id) {
        room.ownership[tid].ownerId = pTo.id;
      }
    });
    (partnerProps || []).forEach((tid) => {
      if (room.ownership[tid]?.ownerId === pTo.id) {
        room.ownership[tid].ownerId = pFrom.id;
      }
    });

    addRoomLog(room, `🤝 Completed trade between ${pFrom.name} and ${pTo.name}!`, 'text-emerald-400 font-bold');
    broadcastRoomState(room.id, { type: 'TRADE_COMPLETED' });
  });

  socket.on('endTurn', ({ roomId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    advanceTurnToNextPlayer(room);
  });

  socket.on('declareBankruptcy', ({ roomId, playerId }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room) return;
    const pid = playerId !== undefined ? playerId : room.players.find((p) => p.socketId === socket.id)?.id ?? 0;
    handlePlayerBankruptcy(room, pid, null, true);
  });

  socket.on('sendMessage', ({ roomId, sender, color, text }) => {
    const room = rooms[roomId || socket.data.roomId];
    if (!room || !text || !text.trim()) return;
    room.chatMessages.push({
      id: Date.now() + Math.random(),
      sender: sender || 'Player',
      color: color || '#f59e0b',
      text: text.trim().slice(0, 240),
    });
    if (room.chatMessages.length > 80) {
      room.chatMessages = room.chatMessages.slice(-80);
    }
    broadcastRoomState(room.id);
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    const room = rooms[roomId];
    if (!room) return;

    const disconnectedPlayer = room.players.find((p) => p.socketId === socket.id);
    if (!disconnectedPlayer) return;

    if (room.status === 'LOBBY') {
      room.players = room.players.filter((p) => p.socketId !== socket.id);
      broadcastRoomState(roomId);
    } else if (room.status === 'PLAYING') {
      disconnectedPlayer.isBot = true;
      disconnectedPlayer.socketId = null;
      addRoomLog(
        room,
        `🔌 ${disconnectedPlayer.name} disconnected – AI Autopilot took over.`,
        'text-amber-400'
      );
      broadcastRoomState(roomId);
      scheduleBotActionIfNeeded(room);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`ToBeRich Syndicate Server listening on port ${PORT}`);
});
