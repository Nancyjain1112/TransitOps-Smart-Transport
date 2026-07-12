from flask import Blueprint, request, jsonify
from database.db import db
from models import Fuel, Vehicle

fuel_bp = Blueprint("fuel", __name__)


@fuel_bp.route("/fuel", methods=["POST"])
def add_fuel():

    data = request.get_json()

    vehicle = Vehicle.query.get(data["vehicle_id"])

    if not vehicle:
        return jsonify({"message": "Vehicle Not Found"}),404

    fuel = Fuel(
        vehicle_id=data["vehicle_id"],
        liters=data["liters"],
        cost=data["cost"]
    )

    db.session.add(fuel)
    db.session.commit()

    return jsonify({"message":"Fuel Added Successfully"})


@fuel_bp.route("/fuel", methods=["GET"])
def get_fuel():

    fuels = Fuel.query.all()

    result=[]

    for fuel in fuels:

        result.append({

            "id":fuel.id,
            "vehicle":fuel.vehicle.vehicle_name,
            "liters":fuel.liters,
            "cost":fuel.cost,
            "date":str(fuel.date)

        })

    return jsonify(result)