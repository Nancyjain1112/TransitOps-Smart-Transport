from flask import Flask

from config import Config

from database.db import db

from models.user import User
from models.vehicle import Vehicle
from models.driver import Driver

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)


@app.route("/")
def home():

    return {
        "message": "Welcome to TransitOps Backend"
    }


if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)