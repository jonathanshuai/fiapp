from sqlalchemy import Column, String
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .entity import Entity, Base
from marshmallow import Schema, fields

class User(UserMixin, Entity, Base):
    __tablename__ = 'users'

    username = Column(String(255))
    password = Column(String(255))
    name = Column(String(255))

    def __init__(self, username, password, name, created_by):
        Entity.__init__(self, created_by)
        self.username = username
        self.password = generate_password_hash(password)
        self.name = name

    def check_password(self, password):
        return check_password_hash(self.password, password)


class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    password = fields.Str()
    name = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()