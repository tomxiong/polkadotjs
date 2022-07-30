import {ApiPromise, Keyring} from '@polkadot/api'
import {WsProvider} from '@polkadot/rpc-provider';
import '@polkadot/api-augment'

const WEB_SOCKET = 'ws://localhost:9944';
const sleep = (ms: number) => new Promise(reslove => setTimeout(reslove, ms));

const connectSubstrate = async() => {
    const wsProvider = new WsProvider(WEB_SOCKET);
    const api = await ApiPromise.create({ provider: wsProvider});
    await api.isReady;
    console.log("connection to substrate node is ok.");
    return api;
};


// subscribe balance change
const subscribeAliceBalance = async (api: ApiPromise) => {
    const keyring = new Keyring({type: 'sr25519'});
    const alice = keyring.addFromUri('//Alice');
    await api.query.system.account(alice.address, aliceAcct => {
        const freeSub = aliceAcct.data.free
        console.log(`free balance is ${freeSub}`);
    });
};


const main = async() => {
    const api = await connectSubstrate();
    await subscribeAliceBalance(api);
    await sleep(600000);

    console.log("The end of subscribe account balance of Alice.");
}

main()
.then(() => {
    console.log("successfully exited");
    process.exit(0);

})
.catch(err => {
    console.log('error occur:', err);
    process.exit(0);
})