# transcriptController.js

## Purpose

Receives uploaded audio files from the frontend.

Validates the uploaded file.

Calls the Transcript Service.

Returns the final analysis response.

---

## Why Async?

The Transcript Service communicates with the Hugging Face Whisper API.

Since API requests take time, the controller uses async/await.

---

## Input

req.file

---

## Output

JSON Response

---

## Flow

Frontend

↓

Audio Upload

↓

uploadMiddleware

↓

Transcript Controller

↓

Transcript Service

↓

Hugging Face Whisper API

↓

Risk Analyzer

↓

Report Service

↓

Frontend








# Code :
const transcriptService = require("../services/transcript/transcriptService");

/**
 * ------------------------------------------------------------
 * Scan Call Transcript
 * ------------------------------------------------------------
 */
exports.scanTranscript = async (req, res) => {

    try {

        // Check whether an audio file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an audio file."
            });
        }

        // Send uploaded audio file to Transcript Service
        const result = await transcriptService.scanTranscript(req.file);

        // Return successful response
        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Transcript Scan Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to analyze transcript."
        });

    }

};





## 1. Imports the Transcript Service.
_const transcriptService = require("../services/transcript/transcriptService");_
The controller never performs transcription itself.

## 2. _exports.scanTranscript = async (req, res) => {_
**Why async?** Because the service calls the Hugging Face API.
The server has to wait for the API response before continuing. Without async, JavaScript won't allow us to use await.

## 3. _if (!req.file)_
Checks whether the user uploaded an audio file. If not,
**Return:** 400 Bad Request

## 4. _const result = await transcriptService.scanTranscript(req.file);_
This is the most important line.
Here Flow becomes : 
Controller

↓

Transcript Service

↓

Hugging Face Whisper API

↓

Transcript

↓

Risk Analyzer

↓

Report

↓

Controller
**_await_ It pauses the controller until the API returns the transcript.**



## 5. Returns the final JSON to the frontend.
_return res.status(200).json({_


## 6. _catch(error)_

If anything fails  =>  API  =>  Internet  =>  Risk Analyzer  =>  Unexpected Error
The controller catches it.


## Why do we use return before res.status()?
**Example :** _return res.status(400).json(...);_
Once the response is sent, The function immediately stops.
**Otherwise,** Node.js may continue executing the remaining code.
Using return is considered a clean and professional practice.


## Architecture Flow
Frontend

↓

POST /api/scan/transcript

↓

uploadMiddleware

↓

req.file

↓

transcriptController

↓

transcriptService

↓

Hugging Face Whisper API

↓

Transcript

↓

riskAnalyzer

↓

reportService

↓

JSON Response

↓

Frontend


