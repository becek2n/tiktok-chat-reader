// require('dotenv').config();
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { TikTokConnectionWrapper, getGlobalConnectionCount } from './connectionWrapper.js';
import { clientBlocked } from './limiter.js';
import { WebcastEvent, ControlEvent } from 'tiktok-live-connector';

const app = express();
const httpServer = createServer(app);

// Enable cross origin resource sharing
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    let tiktokConnectionWrapper;

    console.info(
        'New connection from origin',
        socket.handshake.headers['origin'] || socket.handshake.headers['referer']
    );

    socket.on('setUniqueId', (uniqueId, options) => {
        // Prohibit the client from specifying unsafe options
        if (typeof options === 'object' && options) {
            delete options.requestOptions;
            delete options.websocketOptions;
        } else {
            options = {};
        }

        // Optional session ID from .env
        if (process.env.SESSIONID) {
            options.sessionId = process.env.SESSIONID;
            console.info('Using SessionId');
        }

        // Check rate limit
        if (process.env.ENABLE_RATE_LIMIT && clientBlocked(io, socket)) {
            socket.emit(
                'tiktokDisconnected',
                'You have opened too many connections or made too many connection requests. Please reduce the number of connections or host your own server instance.'
            );
            return;
        }

        // Connect to TikTok LIVE
        try {
            tiktokConnectionWrapper = new TikTokConnectionWrapper(uniqueId, options, true);
            tiktokConnectionWrapper.connect();
        } catch (err) {
            socket.emit('tiktokDisconnected', err.toString());
            return;
        }

        // Redirect wrapper connection lifecycle events
        tiktokConnectionWrapper.once('connected', (state) => socket.emit('tiktokConnected', state));
        tiktokConnectionWrapper.once('disconnected', (reason) =>
            socket.emit('tiktokDisconnected', reason)
        );

        const conn = tiktokConnectionWrapper.connection;

        // --- STREAM CONTROL EVENTS ---
        conn.on(ControlEvent.STREAM_END, () => socket.emit('streamEnd'));
        conn.on(ControlEvent.DISCONNECTED, () => socket.emit('tiktokDisconnected', 'Connection lost.'));
        conn.on(ControlEvent.ERROR, (err) => socket.emit('tiktokError', err.toString()));

        // --- WEBCAST EVENTS (viewer interactions) ---
        conn.on(WebcastEvent.ROOM_USER, (msg) => socket.emit('roomUser', msg));
        conn.on(WebcastEvent.MEMBER, (msg) => socket.emit('member', msg));
        conn.on(WebcastEvent.CHAT, (msg) => socket.emit('chat', msg));
        conn.on(WebcastEvent.GIFT, (msg) => socket.emit('gift', msg));
        conn.on(WebcastEvent.SOCIAL, (msg) => socket.emit('social', msg));
        conn.on(WebcastEvent.LIKE, (msg) => socket.emit('like', msg));
        conn.on(WebcastEvent.QUESTION_NEW, (msg) => socket.emit('questionNew', msg));
        conn.on(WebcastEvent.LINK_MIC_BATTLE, (msg) => socket.emit('linkMicBattle', msg));
        conn.on(WebcastEvent.LINK_MIC_ARMIES, (msg) => socket.emit('linkMicArmies', msg));
        conn.on(WebcastEvent.LIVE_INTRO, (msg) => socket.emit('liveIntro', msg));
        conn.on(WebcastEvent.EMOTE, (msg) => socket.emit('emote', msg));
        conn.on(WebcastEvent.ENVELOPE, (msg) => socket.emit('envelope', msg));
        conn.on(WebcastEvent.SUBSCRIBE, (msg) => socket.emit('subscribe', msg));
    });

    socket.on('disconnect', () => {
        if (tiktokConnectionWrapper) {
            tiktokConnectionWrapper.disconnect();
        }
    });
});

// Emit global connection statistics
setInterval(() => {
    io.emit('statistic', { globalConnectionCount: getGlobalConnectionCount() });
}, 5000);

// Serve static frontend files
app.use(express.static('public'));

// Start HTTP server
const port = process.env.PORT || 8082;
httpServer.listen(port, '0.0.0.0', () => {
    console.info(`Server running! Please visit http://localhost:${port}`);
});
