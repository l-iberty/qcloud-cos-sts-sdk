var STS = require('../sdk/sts');

// 配置参数
var config = {
    secretId: 'AKIDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    secretKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    proxy: '',
    durationSeconds: 1800,
    bucket: 'test-1250000000',
    region: 'ap-guangzhou',
};


// getCredential
// 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/14048
(function () {
    var policy = {
        'version': '2.0',
        'statement': [{
            'action': [
                'name/cos:PutObject',
                'name/cos:InitiateMultipartUpload',
                'name/cos:ListMultipartUploads',
                'name/cos:ListParts',
                'name/cos:UploadPart',
                'name/cos:CompleteMultipartUpload',
            ],
            'effect': 'allow',
            'principal': {'qcs': ['*']},
            'resource': [
                'qcs::cos:ap-guangzhou:uid/1251902136:prefix//1251902136/test/dir/*',
            ],
        }],
    };
    STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        policy: policy,
    }, function (err, credential) {
        console.log('getCredential:');
        console.log(JSON.stringify(policy, null, '    '));
        console.log(err || credential);
    });
})();


// getPolicy
// 获取临时密钥
(function () {
    var scope = [{
        action: 'name/cos:PutObject',
        bucket: 'test-1250000000',
        region: 'ap-guangzhou',
        prefix: '1.txt',
    }];
    var policy = STS.getPolicy(scope);
    STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        policy: policy,
        durationSeconds: config.durationSeconds,
    }, function (err, credential) {
        console.log('getPolicy,getCredential:');
        console.log(JSON.stringify(policy, null, '    '));
        console.log(err || credential);
    });
})();