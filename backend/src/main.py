from flask import Flask, jsonify, request
from flask_cors import CORS

from flask_login import LoginManager
import jwt

from .entities.entity import Session, engine, Base
from .entities.recipe import Recipe, RecipeSchema
from .entities.restriction import Restriction, RestrictionSchema
from . import auth


# creating the Flask application
app = Flask(__name__)
CORS(app)

login_manager = LoginManager(app)
app.register_blueprint(auth.bp)

# if needed, generate database schema
Base.metadata.create_all(engine)

@app.route('/recipes')
def get_recipes():
    # fetching from the database
    session = Session()
    recipe_objects = session.query(Recipe).all()

    # transforming into JSON-serializable objects
    schema = RecipeSchema(many=True)
    recipes = schema.dump(recipe_objects)

    # serializing as JSON
    session.close()
    return jsonify(recipes.data)


@app.route('/recipes', methods=['POST'])
def add_recipe():
    # mount recipe object
    posted_recipe = RecipeSchema(only=('title', 'url', 'imgsrc', 'userid'))\
        .load(request.get_json())

    recipe = Recipe(**posted_recipe.data, created_by="HTTP post request")

    # persist recipe
    session = Session()
    session.add(recipe)
    session.commit()

    # return created recipe
    new_recipe = RecipeSchema().dump(recipe).data
    session.close()
    return jsonify(new_recipe), 201
