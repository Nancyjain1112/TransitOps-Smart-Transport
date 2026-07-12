from database.db import db
from datetime import datetime

class Fuel(db.Model):

    __tablename__ = "fuel_logs"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    liters = db.Column(db.Float, nullable=False)

    cost = db.Column(db.Float, nullable=False)

    date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    vehicle = db.relationship(
        "Vehicle",
        backref="fuel_logs"
    )