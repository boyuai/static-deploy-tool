const get = require('../get');

test('file already exists', async () => {
    await expect(get({
        aliyun: {
            ak: process.env.OSS_AK,
            sk: process.env.OSS_SK,
            region: process.env.OSS_REGION,
            bucket: process.env.OSS_BUCKET,
            endpoint: process.env.OSS_ENDPOINT,
        },
        local: '__tests__/files/a.txt',
        remote: 'static-deploy-tool-test/a.txt',
    })).rejects.toThrow(`local file already exists: __tests__/files/a.txt`)
})

test('file already exists force', (done) => {
    get({
        aliyun: {
            ak: process.env.OSS_AK,
            sk: process.env.OSS_SK,
            region: process.env.OSS_REGION,
            bucket: process.env.OSS_BUCKET,
            endpoint: process.env.OSS_ENDPOINT,
        },
        local: '__tests__/files/a.txt',
        remote: 'static-deploy-tool-test/a.txt',
        force: true,
    }).then(result => {
        expect(result.res.status).toBe(200);
        done();
    })
})

test('get static-deploy-tool-test/a.txt ', (done) => {
    get({
        aliyun: {
            ak: process.env.OSS_AK,
            sk: process.env.OSS_SK,
            region: process.env.OSS_REGION,
            bucket: process.env.OSS_BUCKET,
            endpoint: process.env.OSS_ENDPOINT,
        },
        local: 'test/a.txt',
        remote: 'static-deploy-tool-test/a.txt',
    }).then(result => {
        expect(result.res.status).toBe(200);
        done();
    })
})
