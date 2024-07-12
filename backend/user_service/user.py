import os, sys, json
from flask import Flask, jsonify, session, request, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from os import environ
from flask_cors import CORS
from pydantic import BaseModel
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_bcrypt import Bcrypt 

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = environ.get("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = environ.get("JWT_SECRET_KEY") #need define this in env
app.config['JWT_TOKEN_LOCATION'] = ['headers']

jwt = JWTManager(app)

bcrypt = Bcrypt(app) #use this to hash passwords

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
user_collection=db["user"]

class User(BaseModel):
    username: str
    password: str  

@app.route("/")
def health():
    return jsonify({"code": 200, "message": "User service running"}), 200

@app.route("/createuser", methods=['POST'])
def create_tip():
    """
    use this end point to create tips to be stored in db
    """
    try:
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        user_insert=User(username=data.get('username'),
                        password=hashed_password).model_dump()

        result = user_collection.insert_one(user_insert)
        print(result)
        return jsonify(
            {
                "code": 201,
                "data": request.get_json(),
                "message": "A user has been registered in the user database",
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
                "message": "An error occurred in the user service." ,
            }
        ), 400
    

@app.route("/userlogin", methods=['POST'])
def get_user():
    """
    Use this endpoint to log user in 
    below is the structure to sue for the payload
    {"username":"<username string>",
    "password":"<password string>"} 
    """
    try:
        data = request.get_json()
        username=data.get('username')
        user = user_collection.find_one({'username':username})
        is_valid = bcrypt.check_password_hash(user['password'], data.get('password')) 
        if is_valid == True:
            user["_id"]=None
            access_token = create_access_token(identity=username)
            return jsonify(
                {
                    "code": 200,
                    "data": user,
                    "message": "User found",
                    'access_token': access_token
                }
            ), 201
        else:
            return jsonify(
            {
                "code": 401,
                "data": request.get_json(),
                "message": "User not found, or password incorrect." ,
            }
        ), 401
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
                "message": "User not found, or password incorrect." ,
            }
        ), 400
    
@app.route('/get_name', methods=['GET'])
@jwt_required()
def get_name():
    # Extract the user ID from the JWT
    user_id = get_jwt_identity()
    user = user_collection.find_one({'username':user_id})

    # Check if user exists
    if user:
        return jsonify({'message': 'User found', 'name': user['username']})
    else:
        return jsonify({'message': 'User not found'}), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8004, debug=True)