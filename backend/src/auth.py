import functools

from flask import Blueprint, Flask, jsonify, request

from flask_login import current_user, login_user, logout_user

from werkzeug.security import generate_password_hash


from .entities.entity import Session, engine, Base
from .entities.user import User, UserSchema

bp = Blueprint('auth', __name__)

@bp.route('/register', methods=['POST'])
def add_user():
    # mount user object
    posted_user = UserSchema(only=('username', 'password', 'name'))\
        .load(request.get_json())

    session = Session()
    same_username = session.query(User)\
        .filter(User.username == posted_user.data['username']).all()

    if len(same_username) != 0:
        session.close()
        return 'That username already exists.', 500

    user = User(**posted_user.data, created_by="HTTP post request")

    # persist user
    session.add(user)
    session.commit()

    # return created user
    new_user = UserSchema().dump(user).data
    session.close()
    return jsonify(new_user), 201

@bp.route('/authenticate', methods=['POST'])
def login():
    # User made POST to authenticate when already authenticated
    if current_user.is_authenticated:
        return 'bad', 401

    # Get JSON from request: it should have username and password
    request_json = request.get_json()

    session = Session()
    user = session.query(User)\
        .filter(User.username == request_json['username']).one()


    print(user)

    return 'good', 200 
    # form = LoginForm()
    # if form.validate_on_submit():
    #     user = User.query.filter_by(username=form.username.data).first()
    #     if user is None or not user.check_password(form.password.data):
    #         flash('Invalid username or password')
    #         return redirect(url_for('login'))
    #     login_user(user, remember=form.remember_me.data)
    #     return redirect(url_for('index'))
    # return render_template('login.html', title='Sign In', form=form)