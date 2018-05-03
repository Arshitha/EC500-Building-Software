# EC500C1 Building Software

## Project: URL Analyser
### Documentation still in progress. 
All of the files pertaining to the project can be found in the URL Analyser folder. 

### Product Description

A quick summary of the quality of your surfing activities and different metrics to give you a complete idea about the information contained in the websites you visit. We want to help you determine whether you are accessing authentic information overall, from webpages which have been created and updated regularly so you can ensure that the source of the information you consume is authentic and give you the opportunity to fine-tune and improve the way you surf the internet.

### System Architecture

<img width="880" alt="screen shot 2018-05-01 at 2 47 27 pm" src="https://user-images.githubusercontent.com/10297203/39487909-a549289a-4d4e-11e8-90ba-0905f66fa456.png">

### Minimum Viable Product

### Intructions to run and test 

#### Prerequisites
##### Nodejs Server on local (for Mac Users):

If you already have homebrew, then the following command will install node. 

brew install node

(In case you want uninstall it later. Then here is the command: "brew uninstall node")

##### MongoDB 

#### Extension 
1. Clone the repository to your local machine
2. You could delete all of the folders except "URL_Analyser" (not "URL Analyser")
3. Go to chrome://extensions/ on your chrome browser
4. Click on load unpacked on the top navigation bar
5. Find the folder in path to/URL_Analyser/ExtensionFiles and click "Select"
6. You should see an icon like next to your address bar. 

<img width="43" alt="screen shot 2018-05-02 at 10 12 02 pm" src="https://user-images.githubusercontent.com/10297203/39557496-0ad1f40a-4e56-11e8-9f36-bd0ca2cfb5e5.png">

7. If you click on it, you should be able to see a popup window with all of your current tabs listed

*Before clicking on save session, you'll need to have a local nodejs server running.*

8. From the ExtensionFiles directory of the git repo, run node app.js from your terminal
9. Go back to the extension and click on "Save Session"
10. From the terminal, run python finalScript.py 

## Miniproject-1

**AIM**: To build a library that takes as input two arguments, twitter handle and the number of tweets to be read, respectively. The code scans the given twitter handle for images and runs analysis on those images using Google Vision API. All of the images are annotated with the information obtained through Google Vision API. A video is then created using ffmpeg.

**FILES STRUCTURE**: The files relevant to Miniproject-1 is in the "Miniproject-1" folder. code_withoutKeys.py is the library built. "results" folder contains all of the downloaded images as well as the final video created. 

**USING THE LIBRARY**: For testing, you will need to add your API keys before running it. While running it, you'll need to give in two arguments, i.e., the twitter handle and the count (no. of tweets to be scanned). Resized and annotated images will be saved in the "resized" folder. The originally downloaded images along with the final video will be saved in the "results" folder.

Example: python code_withoutKeys.py iamsrk 20

## Miniproject-2


## Miniproject-3



## Miniproject-4

### Phase 1

### Phase 2

### Phase 3
