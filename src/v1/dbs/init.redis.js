'use strict';

const redis = require('redis');

let client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error',
}

const handleEventConnection = ({connectionRedis}) => {
    connectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log('connectionRedis - Connection Status: Connected');
    });

    connectionRedis.on(statusConnectRedis.END, () => {
        console.log('connectionRedis - Connection Status: disconnected');
    });

    connectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log('connectionRedis - Connection Status: reconnecting');
    });

    connectionRedis.on(statusConnectRedis.ERROR, (err) => {
        console.log(`connectionRedis - Connection Status: error ${err}`);
    });

}

const initRedis = async () => {
    // const instanceRedis = redis.createClient({
    //     password: 'yhcad6Y0q3ZoslwqHanUJN4K6H1dAgSo', 
    //     socket: {
    //         host: 'redis-19046.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com',
    //         port: 19046
    //     },
    //     legacyMode: true
    // });
    const instanceRedis = redis.createClient({
        url: 'redis://default:yhcad6Y0q3ZoslwqHanUJN4K6H1dAgSo@redis-19046.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com:19046/12254810',
        legacyMode: true
      });
    //   await instanceRedis.connect();
      console.log ("connectRedis:",instanceRedis.isReady)
    client.instanceConnect = instanceRedis;
    handleEventConnection({
        connectionRedis: instanceRedis
    });
};

const getRedis = () => client

const closeRedis = () => {

}

module.exports = {
    initRedis,
    getRedis,
    closeRedis
}