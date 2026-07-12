import os

class Config:

    SECRET_KEY = "TransitOpsSecretKey"

    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@localhost/transitops"

    SQLALCHEMY_TRACK_MODIFICATIONS = False