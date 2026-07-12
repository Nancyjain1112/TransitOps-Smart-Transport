from database.db import db
from datetime import datetime


class Vehicle(db.Model):

    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True)

    registration_number = db.Column(db.String(30), unique=True, nullable=False)

    vehicle_name = db.Column(db.String(100), nullable=False)

    vehicle_type = db.Column(db.String(50), nullable=False)

    max_load_capacity = db.Column(db.Float, nullable=False)

    odometer = db.Column(db.Float, default=0)

    acquisition_cost = db.Column(db.Float, nullable=False)

    status = db.Column(
        db.String(30),
        default="Available"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<Vehicle {self.registration_number}>"