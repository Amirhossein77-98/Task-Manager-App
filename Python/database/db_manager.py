from typing import Any
import mysql.connector
from mysql.connector import Error

class SingletonMeta(type):
    _instance = None

    def __call__(cls, *args, **kwargs):
        if cls._instance in None:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance