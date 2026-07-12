from flask import Blueprint,request,jsonify
from database.db import db
from models import Maintenance,Vehicle

maintenance_bp=Blueprint("maintenance",__name__)


@maintenance_bp.route("/maintenance",methods=["POST"])
def add_maintenance():

    data=request.get_json()

    vehicle=Vehicle.query.get(data["vehicle_id"])

    if not vehicle:
        return jsonify({"message":"Vehicle Not Found"}),404

    maintenance=Maintenance(

        vehicle_id=data["vehicle_id"],
        maintenance_type=data["maintenance_type"],
        description=data["description"],
        cost=data["cost"]

    )

    vehicle.status="In Shop"

    db.session.add(maintenance)

    db.session.commit()

    return jsonify({"message":"Maintenance Scheduled"})

@maintenance_bp.route("/maintenance/<int:id>/complete",methods=["PUT"])
def complete_maintenance(id):

    maintenance=Maintenance.query.get_or_404(id)

    maintenance.status="Completed"

    maintenance.vehicle.status="Available"

    db.session.commit()

    return jsonify({"message":"Maintenance Completed"})