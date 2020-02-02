/*
This takes videos from /videos and transcribes them in transcripts.txt.
Stores all videos and transcripts in s3 bucket specified below.
Each video takes 2 lines: video file name on first line, transcription on second.
*/

var AWS = require('aws-sdk'); //import aws sdk for nodejs/javascript
var fs = require('fs');
var path = require('path');
const fetch = require("node-fetch");


AWS.config.update({region:'us-east-1'});
var s3 = new AWS.S3(); //new s3 client
var transcribeservice = new AWS.TranscribeService({apiVersion: '2017-10-26'});

  //var bucketName = 'node-sdk-sample-' + uuid.v4();

const bucketName = "node-sdk-sample-da9bc89e-a099-498d-b3d9-fb4cdd48aa7d";
const folder = './videos/';
const mediaFormat = "mp4";
const destination = 'transcripts.txt';
var fileList = [];
var vines = [];

  //var transcripts = [];

  //create_bucket(bucketName);
  //upload_audio(filename, bucketName, keyName);
  //transcribe(keyName, bucketName, mediaFormat, jobName);
  //givePublicAccess(keyName);
  //getTranscription(keyName, bucketName);

  readFromDir(folder, bucketName, fileList);
  fileList.forEach(file => {
    var vine = {name: file, jobName: "transcription_job" + Math.random(), transcription: "", public: false};
    vines.push(vine);
    //console.log(vine.name);
    //var jobName = "transcription_job" + Math.random();
    transcribe(file, bucketName, mediaFormat, vine.jobName);
  });

  vines.forEach(vine => {
    //console.log(vine.name);
    //if (vine.finished) {
    console.log("getting" + vine.jobName);
    //givePublicAccess(vine.jobName+".json");
    getTranscription(vine.jobName, vine.name);
    //}
  });


/***********End Main *************************************************/

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

/*Uploads all audio in a folder to bucket*/
function readFromDir(folder, bucket, fileList) {
  fs.readdirSync(folder).forEach(file => {
    var filePath = folder + file;
    console.log(file);
    upload_audio(filePath, bucket, file);
    fileList.push(file);
  });
}

/* Function uploads filename (stored locally) to bucketName under the name
specified by object_name. */
function upload_audio(filename, bucket, object_name) {
  var fileContent = fs.readFileSync(filename);
  var params = {
  ACL: "public-read",
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
function transcribe(keyName, bucketName, mediaFormat, jobName) {
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

/* Gives file specified by key public read access. Will end up in infinite
loop if there is an error. */
function givePublicAccess(key) {
    return new Promise((resolve, reject) => {
      var params = {
        ACL: 'public-read',
        Bucket: bucketName,
        Key: key
       };
      s3.putObjectAcl(params, function(err, data) {
         if (err){
           console.log(err, err.stack);
           reject(err);
           givePublicAccess(key);
         }// an error occurred
         else{ // successful response
          console.log(data);
          console.log("public access updated for" + key);
           resolve(data);
         }

       });
    })

}

/* Waits for transcription to finish and gets the transcription text. Will end
up in infinite loop if there is an error. */
function getTranscription(jobName, videoName) {

        //this.setState({transcriptionJobComplete: true});
        //var currentComponent = this;
        var params = {
            TranscriptionJobName: jobName /* required */
          };
         transcribeservice.getTranscriptionJob(params, function(err, data) {
            if (err) {
              setTimeout(() => {
                getTranscription(jobName, videoName);
              }, 5000);
            } // an error occurred
            else{    // successful response
                //console.log(data);
                if(data.TranscriptionJob.TranscriptionJobStatus === 'IN_PROGRESS'){
                  console.log("in progress")
                  setTimeout(() => {
                    getTranscription(jobName, videoName);
                  }, 5000);
                }
                else if(data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED'){
                  givePublicAccess(jobName + ".json");
                  let url = data.TranscriptionJob.Transcript.TranscriptFileUri;
                  console.log(url);
                  //return url;
                  getJson(url, videoName);
                  //console.log(url);

               }
            }
          });


    }

/* Helper function for getTranscription. Gets transcription from json in s3
and appends it to the text file transcripts.txt */
function getJson(url, videoName){
  fetch(url)
  .then(res => res.json())
  .then((out) => {
  console.log(out.results.transcripts[0].transcript);
  fs.appendFile(destination, videoName + "\n"+out.results.transcripts[0].transcript+"\n", (err) => {
    if (err) throw err;
});
}).catch(err => {
  console.error(err);
  setTimeout(() => {
    getJson(url, videoName);
  }, 1000);
});
}
