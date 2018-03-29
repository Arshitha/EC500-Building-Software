from pymongo import MongoClient
import json
from pprint import pprint

client = MongoClient()
client = MongoClient('localhost', 27017)
db = client.airport_database
posts = db.posts

file = open("airports.json","r")
airports_data = json.load(file)
posts.insert_many(airports_data)
