from flask import Blueprint, request, jsonify
from database.db import db
from models import Driver

driver_bp = Blueprint("driver", __name__)


# -----------------------
# Add Driver
# -----------------------
@driver_bp.route("/drivers", methods=["POST"])
def add_driver():

    data = request.get_json()

    driver = Driver(
        full_name=data["full_name"],
        license_number=data["license_number"],
        license_category=data["license_category"],
        license_expiry=data["license_expiry"],
        contact_number=data["contact_number"],
        safety_score=data.get("safety_score", 100),
        status=data.get("status", "Available")
    )

    db.session.add(driver)
    db.session.commit()

    return jsonify({
        "message": "Driver Added Successfully"
    }), 201


# -----------------------
# Get All Drivers
# -----------------------
@driver_bp.route("/drivers", methods=["GET"])
def get_drivers():

    drivers = Driver.query.all()

    result = []

    for d in drivers:

        result.append({

            "id": d.id,

            "full_name": d.full_name,

            "license_number": d.license_number,

            "license_category": d.license_category,

            "license_expiry": str(d.license_expiry),

            "contact_number": d.contact_number,

            "safety_score": d.safety_score,

            "status": d.status

        })

    return jsonify(result)


# -----------------------
# Update Driver
# -----------------------
@driver_bp.route("/drivers/<int:id>", methods=["PUT"])
def update_driver(id):

    driver = Driver.query.get_or_404(id)

    data = request.get_json()

    driver.full_name = data["full_name"]
    driver.contact_number = data["contact_number"]
    driver.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Driver Updated Successfully"
    })


# -----------------------
# Delete Driver
# -----------------------
@driver_bp.route("/drivers/<int:id>", methods=["DELETE"])
def delete_driver(id):

    driver = Driver.query.get_or_404(id)

    db.session.delete(driver)

    db.session.commit()

    return jsonify({
        "message": "Driver Deleted Successfully"
    })