from database.db import db
from datetime import datetime


class Driver(db.Model):

    __tablename__ = "drivers"

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(db.String(100), nullable=False)

    license_number = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    license_category = db.Column(
        db.String(20),
        nullable=False
    )

    license_expiry = db.Column(
        db.Date,
        nullable=False
    )

    contact_number = db.Column(
        db.String(15),
        nullable=False
    )

    safety_score = db.Column(
        db.Integer,
        default=100
    )

    status = db.Column(
        db.String(30),
        default="Available"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<Driver {self.full_name}>"