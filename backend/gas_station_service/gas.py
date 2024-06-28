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
gas_station_collection=db["gas_station"]

class FuelType(BaseModel):
    type: str
    cost_per_litre: float

class GasStation(BaseModel):
    name: str
    address: str
    location: Point
    """
    eg. location: {
                    type: "Point",
                    coordinates: [-73.856077, 40.848447]
                    }<-- this whole thing is a Point object
    """
    add_services: list[str]
    avail_fuel: list[FuelType]
  

@app.route("/")
def health():
    return jsonify({"code": 200, "message": "Carpark service running"}), 200

@app.route("/creategasloc", methods=['POST'])
def create_tip():
    """
    use this end point to create gas station entries to be stored in db
    """
    try:
        all_data = request.get_json()
        for station in all_data.get("station"):
            gas_insert=GasStation(name=station['name'],
                            address=station['address'],
                            location=station['location'],
                            add_services=station['addServices'],
                            avail_fuel=[]
                            ).model_dump()
            fuel=station['availFuel']
            for i in fuel:
                gas_insert['avail_fuel'].append(FuelType(type=i['type'],
                                                        cost_per_litre=i['costPerLitre']).model_dump())

            result = gas_station_collection.insert_one(gas_insert)
            print(result)
        return jsonify(
            {
                "code": 201,
                "data": request.get_json(),
                "message": "Gas station has been registered in the ticket database",
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
                "message": "An error occurred in gas service." ,
            }
        ), 400
    

@app.route("/getgasstation")
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
        result = gas_station_collection.find({'address':{'$regex': f'.*{address}.*'}})
        for i in result:
            i["_id"]=None
            ret.append(i)
        
        return jsonify(
            {
                "code": 200,
                "data": ret,
                "message": "gas station found",
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
                "message": "An error occurred in gas service." ,
            }
        ), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8003, debug=True)