import { EventEmitter } from 'events';
import {
    TikTokLiveConnection,
    WebcastEvent,
    ControlEvent
} from 'tiktok-live-connector';

let globalConnectionCount = 0;

/**
 * TikTok LIVE connection wrapper with advanced reconnect functionality and error handling
 * Updated for tiktok-live-connector v2.x
 */
export class TikTokConnectionWrapper extends EventEmitter {
    constructor(uniqueId, options = {}, enableLog = false) {
        super();

        this.uniqueId = uniqueId;
        this.enableLog = enableLog;

        // Connection State
        this.clientDisconnected = false;
        this.reconnectEnabled = true;
        this.reconnectCount = 0;
        this.reconnectWaitMs = 1000;
        this.maxReconnectAttempts = 5;

        // Use the new class
        this.connection = new TikTokLiveConnection(uniqueId, {
            processInitialData: true,
            enableExtendedGiftInfo: true,
            requestPollingIntervalMs: 1000,
            ...options
        });

        // Listen for stream ending (ControlEvent)
        this.connection.on(ControlEvent.STREAM_END, () => {
            this.log(`streamEnd event received, giving up connection`);
            this.reconnectEnabled = false;
        });

        // Handle disconnection
        this.connection.on(ControlEvent.DISCONNECTED, () => {
            globalConnectionCount -= 1;
            this.log(`TikTok connection disconnected`);
            this.scheduleReconnect();
        });

        // Handle generic error
        this.connection.on(ControlEvent.ERROR, (err) => {
            this.log(`Error event triggered: ${err.message || err}`);
            console.error(err);
        });
    }

    async connect(isReconnect = false) {
        try {
            const state = await this.connection.connect();

            this.log(
                `${isReconnect ? 'Reconnected' : 'Connected'} to roomId ${
                    state.roomId
                }`
            );
            globalConnectionCount += 1;

            // Reset reconnect vars
            this.reconnectCount = 0;
            this.reconnectWaitMs = 1000;

            // Client disconnected while establishing connection => drop connection
            if (this.clientDisconnected) {
                await this.connection.disconnect();
                return;
            }

            // Notify client
            if (!isReconnect) {
                this.emit('connected', state);
            }
        } catch (err) {
            this.log(`${isReconnect ? 'Reconnect' : 'Connection'} failed: ${err}`);

            if (isReconnect) {
                this.scheduleReconnect(err);
            } else {
                this.emit('disconnected', err.toString());
            }
        }
    }

    scheduleReconnect(reason) {
        if (!this.reconnectEnabled) return;

        if (this.reconnectCount >= this.maxReconnectAttempts) {
            this.log(`Give up connection, max reconnect attempts exceeded`);
            this.emit('disconnected', `Connection lost. ${reason}`);
            return;
        }

        this.log(`Try reconnect in ${this.reconnectWaitMs}ms`);

        setTimeout(() => {
            if (!this.reconnectEnabled || this.reconnectCount >= this.maxReconnectAttempts)
                return;

            this.reconnectCount += 1;
            this.reconnectWaitMs *= 2;
            this.connect(true);
        }, this.reconnectWaitMs);
    }

    disconnect() {
        this.log(`Client connection disconnected`);

        this.clientDisconnected = true;
        this.reconnectEnabled = false;

        if (this.connection?.isConnected) {
            this.connection.disconnect();
        }
    }

    log(msg) {
        if (this.enableLog) {
            console.log(`WRAPPER @${this.uniqueId}: ${msg}`);
        }
    }
}

export const getGlobalConnectionCount = () => globalConnectionCount;
