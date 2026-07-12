from flask import Blueprint, request, jsonify
from database.db import db
from models import Vehicle

vehicle_bp = Blueprint("vehicle", __name__)

@vehicle_bp.route("/vehicles", methods=["POST"])
def add_vehicle():

    data = request.get_json()

    vehicle = Vehicle(
        registration_number=data["registration_number"],
        vehicle_name=data["vehicle_name"],
        vehicle_type=data["vehicle_type"],
        max_load_capacity=data["max_load_capacity"],
        odometer=data["odometer"],
        acquisition_cost=data["acquisition_cost"],
        status=data.get("status", "Available")
    )

    db.session.add(vehicle)
    db.session.commit()

    return jsonify({
        "message": "Vehicle Added Successfully"
    }), 201

@vehicle_bp.route("/vehicles", methods=["GET"])
def get_all_vehicles():

    vehicles = Vehicle.query.all()

    result = []

    for vehicle in vehicles:

        result.append({

            "id": vehicle.id,

            "registration_number": vehicle.registration_number,

            "vehicle_name": vehicle.vehicle_name,

            "vehicle_type": vehicle.vehicle_type,

            "max_load_capacity": vehicle.max_load_capacity,

            "odometer": vehicle.odometer,

            "acquisition_cost": vehicle.acquisition_cost,

            "status": vehicle.status

        })

    return jsonify(result)

@vehicle_bp.route("/vehicles/<int:id>", methods=["PUT"])
def update_vehicle(id):

    vehicle = Vehicle.query.get_or_404(id)

    data = request.get_json()

    vehicle.vehicle_name = data["vehicle_name"]
    vehicle.vehicle_type = data["vehicle_type"]
    vehicle.max_load_capacity = data["max_load_capacity"]
    vehicle.odometer = data["odometer"]
    vehicle.acquisition_cost = data["acquisition_cost"]
    vehicle.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Vehicle Updated"
    })

@vehicle_bp.route("/vehicles/<int:id>", methods=["DELETE"])
def delete_vehicle(id):

    vehicle = Vehicle.query.get_or_404(id)

    db.session.delete(vehicle)

    db.session.commit()

    return jsonify({
        "message": "Vehicle Deleted"
    })

@vehicle_bp.route("/vehicles/search/<string:registration>", methods=["GET"])
def search_vehicle(registration):

    vehicle = Vehicle.query.filter_by(
        registration_number=registration
    ).first()

    if vehicle is None:

        return jsonify({
            "message": "Vehicle Not Found"
        }),404

    return jsonify({

        "id": vehicle.id,

        "registration_number": vehicle.registration_number,

        "vehicle_name": vehicle.vehicle_name,

        "vehicle_type": vehicle.vehicle_type,

        "status": vehicle.status

    })

