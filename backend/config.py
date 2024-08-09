from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'sujitrajt'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///mydatabase.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)