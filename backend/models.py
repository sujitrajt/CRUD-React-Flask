from config import db
from uuid import uuid4
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(80), unique=False, nullable = False)
    last_name = db.Column(db.String(80), unique=False, nullable = False)
    email = db.Column(db.String(120), unique=True, nullable = False)
    # imageName = db.Column(db.String(255), nullable = True)
    # data = db.Column(db.LargeBinary, nullable=True)

    def to_json(self):
        return{
            "id" : self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email
        }

class Image(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable=False)
    data = db.Column(db.LargeBinary, nullable=False)

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(150), unique=True)
    
    def to_json(self):
        return{
            "id" : self.id,
            "username": self.username,
            "email": self.email
        }
