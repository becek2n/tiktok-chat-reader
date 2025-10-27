/**
 * Wrapper for client-side TikTok connection over Socket.IO
 * Compatible with tiktok-live-connector v2.x server
 * Includes reconnect functionality and event forwarding.
 */
class TikTokIOConnection {
    constructor(serverURL) {
        this.socket = io(serverURL, {
            transports: ['websocket', 'polling']
        });
        this.uniqueId = null;
        this.options = null;

        // --- SOCKET.IO EVENTS ---
        this.socket.on('connect', () => {
            console.info('✅ Socket connected!');

            // Reconnect automatically to the previous TikTok streamer
            if (this.uniqueId) {
                console.info('Reconnecting to previous streamer...');
                this.setUniqueId();
            }
        });

        this.socket.on('disconnect', (reason) => {
            console.warn(`⚠️ Socket disconnected (${reason})`);
        });

        // LIVE ended (ControlEvent.STREAM_END)
        this.socket.on('streamEnd', () => {
            console.warn('📴 TikTok LIVE has ended!');
            this.uniqueId = null;
        });

        // TikTok disconnection or server-side disconnect
        this.socket.on('tiktokDisconnected', (errMsg) => {
            console.warn(`❌ TikTok disconnected: ${errMsg}`);
            if (errMsg && errMsg.includes('LIVE has ended')) {
                this.uniqueId = null;
            }
        });

        // Server-side error forwarded from TikTok connection
        this.socket.on('tiktokError', (errMsg) => {
            console.error(`🔥 TikTok connection error: ${errMsg}`);
        });
    }

    /**
     * Connect to a TikTok LIVE stream
     * @param {string} uniqueId - TikTok username
     * @param {object} options - Connection options
     */
    connect(uniqueId, options) {
        this.uniqueId = uniqueId;
        this.options = options || {};

        this.setUniqueId();

        return new Promise((resolve, reject) => {
            this.socket.once('tiktokConnected', resolve);
            this.socket.once('tiktokDisconnected', reject);

            setTimeout(() => {
                reject('⏰ Connection Timeout');
            }, 15000);
        });
    }

    /**
     * Emit the unique ID and options to the server
     */
    setUniqueId() {
        if (!this.uniqueId) return;
        console.info(`🎯 Connecting to TikTok user: ${this.uniqueId}`);
        this.socket.emit('setUniqueId', this.uniqueId, this.options);
    }

    /**
     * Register a handler for a specific server-side event
     * (e.g., 'chat', 'gift', 'like', 'member', etc.)
     */
    on(eventName, handler) {
        this.socket.on(eventName, handler);
    }
}

// Export (for browser use, attach to window)
window.TikTokIOConnection = TikTokIOConnection;
