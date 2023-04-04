import aws from 'aws-sdk';

export const handler = async (event) => {
    var s3 = new aws.S3();
    var key = event.Records[0].s3.object.key;
    s3.copyObject({
        Bucket: "s3sampletestbucket",
        CopySource: encodeURI("s3samplebuckettestbackup/" + key),
        Key: key,
    }, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log("S3 object copy successful.");
        }
    });
};
