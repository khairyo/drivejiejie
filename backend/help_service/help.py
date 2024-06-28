import os, sys, json
from flask import Flask, request, jsonify
from os import environ
from flask_cors import CORS
from pydantic import BaseModel
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
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
tips_collection=db["tips"]

class Service_provider(BaseModel):
    name: str
    desc: str
    phone: list[int]

class Issue(BaseModel):
    issue_type: str
    tips: list[str]
    service_provider: list[Service_provider]
  

@app.route("/")
def health():
    return jsonify({"code": 200, "message": "Help service running"}), 200

@app.route("/createtip", methods=['POST'])
def create_tip():
    """
    use this end point to create tips to be stored in db
    """
    try:
        all_data = request.get_json().get('tips')
        for tip in all_data:
            issue_insert=Issue(issue_type=tip['issueType'],
                            tips=tip['tips'],
                            service_provider=[],
                            ).model_dump()
            providers=tip['serviceProvider']
            for i in providers:
                issue_insert['service_provider'].append(Service_provider(name=i["name"],
                                                                    desc=i["desc"],
                                                                    phone=i["phone"]).model_dump())

            result = tips_collection.insert_one(issue_insert)
        print(result)
        return jsonify(
            {
                "code": 201,
                "data": request.get_json(),
                "message": "A tip has been registered in the help database",
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
                "message": "An error occurred in the help service." ,
            }
        ), 400
    

@app.route("/gettip")
def get_tips():
    """
    Use this endpoint to pull tips from the db based on keyword
    below is the structure to sue for the payload
    {"search":"${keyword}"} 
    """
    try:
        ret=[]
        data = request.get_json()
        tip = data.get("search")
        result = tips_collection.find({'issue_type':{'$regex': f'.*{tip}.*'}})
        for i in result:
            i["_id"]=None
            ret.append(i)
        
        return jsonify(
            {
                "code": 200,
                "data": ret,
                "message": "Tip found",
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
                "message": "An error occurred in the help service." ,
            }
        ), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001, debug=True)