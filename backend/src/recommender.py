import os

from flask import Flask, Blueprint, jsonify, request, url_for, send_from_directory

import jwt

from .entities.entity import Session, engine, Base
from .entities.user import User, UserSchema
from .entities.recipe import Recipe, RecipeSchema
from .entities.restriction import Restriction, RestrictionSchema
from . import auth

from . import quickrecipe


bp = Blueprint('recommender', __name__)

UPLOAD_FOLDER = 'temp/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

@bp.route('/recommender', methods=('POST'))
def recommender():
  # Check authentication and get userid
    auth_header = request.headers.get('Authorization')
    
    auth_token = ''
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    
    if auth_token:
        userid, message = User.decode_auth_token(auth_token)
        # On failure, return error message
        if not userid:
            return jsonify({'message': message}), 401
        # On successful auth
        else:
            # fetching from the database restrictions
            session = Session()
            restrictions_object = session.query(Restriction)\
                .filter(Restriction.userid == userid).one()

            # Turn it into some json object and return
            schema = RestrictionSchema()
            restrictions = schema.dump(restrictions_object)

            print(request)
            print(request.get_json())
            
            # check if the post request has the file part
            if 'file' not in request.files:
                return jsonify({'message': 'No file part.'}), 500
            file = request.files['file']
                
            # if user does not select file, browser also
            # submit a empty part without filename
            if file.filename == '':
                return jsonify({'message': 'No selected file.'}), 500

            if not file or not allowed_file(file.filename):
                return jsonify({'message': 'File type not allowed.'}), 500
            else:
                # Upload file to our temp directory
                filename = secure_filename(file.filename)
                file_path = os.path.join(UPLOAD_FOLDER, filename) 
                file.save(file_path)
                imgsrc = url_for('recommender.uploaded_file', filename=filename)

                # Return the restrictions w/ their names and values as tuples in a list
                option_names = restrictions.keys()
                option_values = list(restrictions)
                options = list(zip(option_names, option_values))[2:] # Remove id and userid

                # # Blocking call to neural network and recipe api 
                # ingredients, recipes = quickrecipe.find_recipes(
                #     os.path.join(os.getcwd(), UPLOAD_FOLDER, filename), options)

                # ingredients = pred_str = ', '.join(list(ingredients))
                # if len(recipes) == 0:
                #     recipes = [{'title': 'No recipes were found', 'url': '', 'image': ''}]
                
                return jsonify({'message': 'success'}), 500

    # db = get_db()
    return jsonify({'message': 'end!!'}), 500


@bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(os.path.join(os.getcwd(), UPLOAD_FOLDER),
                               filename)

