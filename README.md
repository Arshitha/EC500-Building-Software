# EC500C1 Building Software

## Project: URL Analyser

All of the files pertaining to the project can be found in the URL Analyser folder.  

## Miniproject-1

**AIM**: To build a library that takes as input two arguments, twitter handle and the number of tweets to be read, respectively. The code scans the given twitter handle for images and runs analysis on those images using Google Vision API. All of the images are annotated with the information obtained through Google Vision API. A video is then created using ffmpeg.

**FILES STRUCTURE**: The files relevant to Miniproject-1 is in the "Miniproject-1" folder. code_withoutKeys.py is the library built. "results" folder contains all of the downloaded images as well as the final video created. 

**USING THE LIBRARY**: For testing, you will need to add your API keys before running it. While running it, you'll need to give in two arguments, i.e., the twitter handle and the count (no. of tweets to be scanned). Resized and annotated images will be saved in the "resized" folder. The originally downloaded images along with the final video will be saved in the "results" folder.

Example: python code_withoutKeys.py iamsrk 20
