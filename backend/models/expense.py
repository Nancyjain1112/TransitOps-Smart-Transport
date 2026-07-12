from database.db import db
from datetime import datetime

class Expense(db.Model):

    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.id"),
        nullable=False
    )

    expense_type = db.Column(db.String(100))

    amount = db.Column(db.Float)

    description = db.Column(db.Text)

    expense_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    vehicle = db.relationship(
        "Vehicle",
        backref="expenses"
    )