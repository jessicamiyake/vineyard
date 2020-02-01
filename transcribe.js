/*// TODO:
- get video from url - should not be hard but i cant figure it
- extract transcription text
*/

var AWS = require('aws-sdk'); //import aws sdk for nodejs/javascript
AWS.config.update({region:'us-east-1'});
var fs = require('fs');
//var uuid = require('node-uuid'); //creates unique bucket id

var s3 = new AWS.S3(); //new s3 client

//var bucketName = 'node-sdk-sample-' + uuid.v4();
var bucketName = "node-sdk-sample-da9bc89e-a099-498d-b3d9-fb4cdd48aa7d";
var keyName = "/videos/junior.mp4"; //name of file in local directory
var filename = "/videos/junior.mp4"; //desired name of file on s3
var mediaFormat = "mp4";
var jobName = "transcription_job" + Math.random();


//create_bucket(bucketName);
upload_audio(filename, bucketName, keyName);
transcribe(keyName, bucketName, mediaFormat, jobName);
//givePublicAccess(keyName);
//getTranscription(keyName, bucketName);

/* Function creates a bucket under bucket_name. Must be unique. */
function create_bucket(bucket_name) {
  var params = {
  Bucket: bucket_name
 };
 s3.createBucket(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
}

/* Function uploads filename (stored locally) to bucketName under the name
specified by object_name. */
function upload_audio(filename, bucket, object_name) {
  var fileContent = fs.readFileSync(filename);
  var params = {
  Bucket: bucket,
  Key: object_name,
  Body: fileContent
 };
 s3.putObject(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });

}

/* Function takes audio uploaded to bucketName under keyName and turns it
into a transcription file in the same bucket. Output file is named jobName. */
function transcribe(keyName, bucketName, mediaFormat, JobName) {
  var transcribeservice = new AWS.TranscribeService({apiVersion: '2017-10-26'});
  params = {
    LanguageCode: "en-US",
    Media: {
    MediaFileUri: "https://s3.amazonaws.com/" + bucketName + "/" + keyName
              },
    MediaFormat: mediaFormat,
    TranscriptionJobName: jobName,
    OutputBucketName: bucketName
    };

  transcribeservice.startTranscriptionJob(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else{
      console.log(data);  // successful response
    }
  });
}

/*function getFromBucket(bucketName, fileName){
  var params = {
    Bucket: bucketName,
    Key: fileName
  };
  s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     {
    console.log(data);
    return data;
  }      // successful response

  });

}*/

/*var params = {
           TranscriptionJobName: jobName
         };
        transcribeservice.getTranscriptionJob(params, function(err, data) {
           if (err) console.log(err, err.stack); // an error occurred
           else{    // successful response
               console.log(data);
             }
        });*/
