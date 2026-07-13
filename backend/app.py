from flask_cors import CORS
from flask import Flask

from config import Config

from database.db import db

from models import (
    User,
    Vehicle,
    Driver,
    Trip,
    Maintenance,
    Fuel,
    Expense
)

from routes.vehicle import vehicle_bp
from routes.driver import driver_bp
from routes.trip import trip_bp 
from routes.fuel import fuel_bp
from routes.maintenance import maintenance_bp
from routes.expense import expense_bp
from routes.dashboard import dashboard_bp
from routes.reports import reports_bp

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}}
)

app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(vehicle_bp)
app.register_blueprint(driver_bp)
app.register_blueprint(trip_bp)
app.register_blueprint(fuel_bp)
app.register_blueprint(maintenance_bp)
app.register_blueprint(expense_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(reports_bp)

@app.route("/")
def home():

    return {
        "message": "Welcome to TransitOps Backend"
    }


if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)