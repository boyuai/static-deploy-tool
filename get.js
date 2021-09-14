const fs = require('fs');
const getClient = require('./oss');

module.exports = async ({ aliyun, local, remote, force }) => {
    const client = getClient(aliyun);
    if (!force && fs.existsSync(local)) {
        throw new Error('local file already exists: ' + local);
    }

    let tryTime = 1;

    const get = async () => {
        try {
            return client.get(remote, local);
        } catch (e) {
            tryTime--;
            if (tryTime && !process.env.DISABLE_RETRY) {
                console.log(`Retrying: ${local}`);
                await new Promise(r => setTimeout(r, 1000))
                await get();
            } else {
                throw e;
            }
        }
    }
    return await get();
}
