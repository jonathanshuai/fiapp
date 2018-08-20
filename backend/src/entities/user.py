from sqlalchemy import Column, String

from .entity import Entity, Base
from marshmallow import Schema, fields

class User(Entity, Base):
    __tablename__ = 'users'

    username = Column(String(255))
    password = Column(String(255))
    name = Column(String(255))

    def __init__(self, username, password, name, created_by):
        Entity.__init__(self, created_by)
        self.username = username
        self.password = password
        self.name = name


class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    password = fields.Str()
    name = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()