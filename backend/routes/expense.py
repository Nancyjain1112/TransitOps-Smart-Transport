from flask import Blueprint,request,jsonify
from database.db import db
from models import Expense,Vehicle

expense_bp=Blueprint("expense",__name__)


@expense_bp.route("/expense",methods=["POST"])
def add_expense():

    data=request.get_json()

    expense=Expense(

        vehicle_id=data["vehicle_id"],
        expense_type=data["expense_type"],
        amount=data["amount"],
        description=data["description"]

    )

    db.session.add(expense)

    db.session.commit()

    return jsonify({"message":"Expense Added"})


@expense_bp.route("/expense",methods=["GET"])
def get_expense():

    expenses=Expense.query.all()

    result=[]

    for e in expenses:

        result.append({

            "vehicle":e.vehicle.vehicle_name,
            "expense_type":e.expense_type,
            "amount":e.amount,
            "description":e.description

        })

    return jsonify(result)