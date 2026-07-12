from database.db import db
from datetime import datetime

class Maintenance(db.Model):

    __tablename__ = "maintenance"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    maintenance_type = db.Column(db.String(100), nullable=False)

    description = db.Column(db.Text)

    cost = db.Column(db.Float, nullable=False)

    status = db.Column(
        db.String(20),
        default="Open"
    )

    maintenance_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    vehicle = db.relationship(
        "Vehicle",
        backref="maintenance_records"
    )