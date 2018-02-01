import tweepy

consumer_key = 'ZVRxDCgRW51m7ssYsWDGfYUhF'
consumer_secret = 'PDTG4shePaKCFDA6CMM3BnmuepeZs2IVIlvGOC6BYcXI2kIMqx'
access_token = '395461617-tSt09i0JtWW766loBB0Ud9e1bHrAIUuVwp8nlHDP'
access_secret = '0qTEygwVeJMzmreW34vw1vhsu8RonUzr8oMFaxuA4mnWE'

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

api = tweepy.API(auth)

#public_tweets = api.home_timeline()
#for tweet in public_tweets:
#    print (tweet.text)

for status in tweepy.Cursor(api.home_timeline).items(10):
    # Process a single status
    print(status.text)