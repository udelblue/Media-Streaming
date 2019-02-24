'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');

// stream video response back
router.get('/video', function(req, res) {
  var vid = req.query.id; 
  var path = ''
  if (vid) {
    path = 'media/' + vid + '.mp4'
  }else{
    res.status(404);
    res.send('file not found');
  }
  //console.log(path)
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})


// stream audio response back
router.get('/audio', function(req, res) {
  var aid = req.query.id; 
  var path = ''
  if (aid) {
    path = 'media/' + aid + '.mp3'
  }else{
    res.status(404);
    res.send('file not found');
  }
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp3',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp3',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

module.exports = router;