import os, sys, json
from flask import Flask, request, jsonify
from os import environ
from flask_cors import CORS
from pydantic import BaseModel
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from geojson import Point
from geojson_pydantic import Feature, FeatureCollection, Point
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__)

CORS(app)

uri = environ.get("uri")
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db=client['DriveJieJie']
carpark_collection=db["carpark"]

class Parking(BaseModel):
    period: str
    fee: float
    per_min_charge: float

class Carpark(BaseModel):
    name: str
    address: str
    location: Point
    """
    eg. location: {
                    type: "Point",
                    coordinates: [-73.856077, 40.848447]
                    }<-- this whole thing is a Point object
    """
    parking_rate: list[Parking]
  

@app.route("/")
def health():
    return jsonify({"code": 200, "message": "Carpark service running"}), 200

@app.route("/createcarparkloc", methods=['POST'])
def create_tip():
    """
    use this end point to create tips to be stored in db
    """
    try:
        all_data = request.get_json().get('carparks')
        print(all_data)
        for data in all_data:
            carpark_insert=Carpark(name=data['name'],
                            address=data['address'],
                            location=data['location'],
                            parking_rate=[]
                            ).model_dump()
            rates=data.get('parkingRate')
            for i in rates:
                carpark_insert['parking_rate'].append(Parking(period=i['period'],
                                                                fee=i['fee'],
                                                                per_min_charge=i['perMinCharge']).model_dump())

            result = carpark_collection.insert_one(carpark_insert)
            print(result)
        return jsonify(
            {
                "code": 201,
                "data": request.get_json(),
                "message": "Event has been registered in the ticket database",
            }
        ), 201
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        ex_str = (
            str(e)
            + " at "
            + str(exc_type)
            + ": "
            + fname
            + ": line "
            + str(exc_tb.tb_lineno)
        )
        print(ex_str)

        return jsonify(
            {
                "code": 400,
                "data": request.get_json(),
                "message": "An error occurred in carpark." ,
            }
        ), 400
    

@app.route("/getcarpark")
def get_tips():
    """
    Use this endpoint to pull carparks from the db based on address, or part of it
    below is the structure to sue for the payload
    {"search":"<address>"} 
    """
    try:
        ret=[]
        data = request.get_json()
        address = data.get("search")
        result = carpark_collection.find({'address':{'$regex': f'.*{address}.*'}})
        for i in result:
            i["_id"]=None
            ret.append(i)
        
        return jsonify(
            {
                "code": 200,
                "data": ret,
                "message": "carpark found",
            }
        ), 201
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        ex_str = (
            str(e)
            + " at "
            + str(exc_type)
            + ": "
            + fname
            + ": line "
            + str(exc_tb.tb_lineno)
        )
        print(ex_str)

        return jsonify(
            {
                "code": 400,
                "data": request.get_json(),
                "message": "An error occurred in carpark." ,
            }
        ), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8002, debug=False)