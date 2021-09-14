#!/usr/bin/env node
const program = require('commander');
const sync = require('./sync');
const put = require('./put');
const copy = require('./copy');
const get = require('./get');

program
    .version('1.2.0')
    .option('-k, --ak [ak]', 'Access Key Id')
    .option('-s, --sk [sk]', 'Secret Access Key')
    .option('-r, --region [region]', 'Region')
    .option('-b, --bucket [bucket]', 'Bucket')
    .option('-e, --endpoint [endpoint]', 'Optional, will override region setting')
    .option('-f, --force [force]', 'Optional, force get object and override')

program
    .command('sync <local> <remote>')
    .action(async (local, remote) => {
        try {
            await sync({
                local,
                remote,
                aliyun: checkParams(),
            })
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    })

program
    .command('put <local> <remote>')
    .action(async (local, remote) => {
        try {
            await put({
                local,
                remote,
                aliyun: checkParams(),
            })
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    })

program
    .command('copy <source> <dest>')
    .action(async (source, dest) => {
        try {
            await copy({
                source,
                dest,
                aliyun: checkParams(),
            })
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    })


program
    .command('get <remote> <local>')
    .action(async (remote, local) => {
        try {
            await get({
                local,
                remote,
                aliyun: checkParams(),
                force: program.force
            })
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    })

program.parse(process.argv);

function checkParams() {
    const ak = program.ak || process.env.OSS_AK;
    const sk = program.sk || process.env.OSS_SK;
    const region = program.region || process.env.OSS_REGION;
    const bucket = program.bucket || process.env.OSS_BUCKET;
    const endpoint = program.endpoint || process.env.OSS_ENDPOINT;
    if (!ak) {
        console.error('AK is missing');
        process.exit(1)
    }
    if (!sk) {
        console.error('SK is missing');
        process.exit(1)
    }
    if (!bucket) {
        console.error('Bucket is missing');
        process.exit(1)
    }
    if (!region && !endpoint) {
        console.error('Region or endpoint is missing');
        process.exit(1);
    }
    return { ak, sk, region, bucket, endpoint };
}
