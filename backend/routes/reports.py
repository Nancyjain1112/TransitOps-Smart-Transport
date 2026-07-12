from flask import Blueprint, jsonify
from models import Trip, Vehicle

reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/reports/trips", methods=["GET"])
def trip_report():

    trips = Trip.query.all()

    report = []

    for t in trips:

        report.append({

            "trip_id": t.id,

            "vehicle": t.vehicle.vehicle_name,

            "driver": t.driver.full_name,

            "source": t.source,

            "destination": t.destination,

            "distance": t.actual_distance,

            "revenue": t.revenue,

            "status": t.status

        })

    return jsonify(report)