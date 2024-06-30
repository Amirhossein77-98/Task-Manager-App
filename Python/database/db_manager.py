import mysql.connector
from mysql.connector import Error

class SingletonMeta(type):
    _instance = None

    def __call__(cls, *args, **kwargs):
        if cls._instance in None:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance
    
class MySQLConnctionManager(metaclass=SingletonMeta):
    def __init__(self, host, database, user, password) -> None:
        self._connection = None
        self._host = host
        self._database = database
        self._user = user
        self._passwrod = password
        self.connect()

    def connect(self) -> None:
        if self._connection is None:
            try:
                self._connection = mysql.connector.connect(
                    host = self._host,
                    database = self._database,
                    user = self._user,
                    password = self._passwrod
                )
                if self._connection.is_connected():
                    print("Successfully connected to the database.")
            except Error as e:
                print(f"Error while connecting to server: {e}")
                self._connection = None

    def get_connection(self):
        if not self._connection or not self._connection.is_connected():
            self.connect()
        return self._connection
    
    def close_conncetion(self):
        if self._connection or self._connection.is_connected():
            self._connection.close()
            self._connection = None