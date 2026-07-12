from database.db import db
from datetime import datetime


class Trip(db.Model):

    __tablename__ = "trips"

    id = db.Column(db.Integer, primary_key=True)

    source = db.Column(db.String(100), nullable=False)

    destination = db.Column(db.String(100), nullable=False)

    cargo_weight = db.Column(db.Float, nullable=False)

    planned_distance = db.Column(db.Float, nullable=False)

    actual_distance = db.Column(db.Float)

    fuel_consumed = db.Column(db.Float)

    revenue = db.Column(db.Float, default=0)

    start_odometer = db.Column(db.Float)

    end_odometer = db.Column(db.Float)

    status = db.Column(
        db.String(30),
        default="Draft"
    )

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    driver_id = db.Column(
        db.Integer,
        db.ForeignKey("drivers.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    vehicle = db.relationship(
        "Vehicle",
        backref="trips"
    )

    driver = db.relationship(
        "Driver",
        backref="trips"
    )

    def __repr__(self):
        return f"<Trip {self.id}>"