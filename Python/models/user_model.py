from mysql.connector import Error
from views.user_view import UserView

class User:
    def __init__(self, username, password, name) -> None:
        self.username = username
        self.password = password
        self.name = name

class UserRepository:
    def __init__(self, connection_manager) -> None:
        self._connection_manager = connection_manager
        self.create()
    
    def create(self) -> None:
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""CREATE TABLE IF NOT EXISTS users(
                            username varchar(255) NOT NULL,
                            password varchar(255) NOT NULL,
                            name varchar(255) NOT NULL,
                            PRIMARY KEY (username)
                            );""")
            connection.commit()
            cursor.close()
        except Error as e:
            UserView.table_creation_error(e)

    def read(self, username) -> None | object:
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            result = cursor.fetchone()
            if result:
                return User(username=result['username'], password=result['password'], name=result['name'])
            print("No user found with this username!")
            return None
        except Error as e:
            UserView.user_operations_failure("reading", e)
        finally:
            cursor.close()
    
    def update(self, user) -> None:
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("UPDATE users SET username = %s, password = %s, name = %s", (user.username, user.password, user.name))
            connection.commit()
            UserView.user_operations_success("updated")
        except Error as e:
            UserView.user_operations_failure("updating", e)
        finally:
            cursor.close()
    
    def delete(self, username, password):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("DELETE FROM users WHERE username = %s && password = %s", (username, password))
            connection.commit()
            UserView.user_operations_success("deleted")
        except Error as e:
            UserView.user_operations_failure("deleting", e)
        finally:
            cursor.close()

    def register(self, user):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO users (username, password, name) VALUES (%s, %s, %s)", (user.username, user.password, user.name))
            connection.commit()
            UserView.user_operations_success("registered")
        except Error as e:
            UserView.user_operations_failure("creating", e)
        finally:
            cursor.close()

    def login(self, username, password):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            result = cursor.fetchone()
            if result:
                return User(result[0], result[1], result[2])
            else:
                print("Invalid email or password")
                return None
        except Error as e:
            UserView.user_operations_failure("logging in", e)
            return None
        finally:
            cursor.close()

    def check_duplicate(self, username):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT COUNT(*) FROM users WHERE username = %s", (username,))
            result = cursor.fetchone()
            if result[0] != 0:
                return True
            else:
                return False
        except Error as e:
            UserView.user_operations_failure('checking username of', e)
        finally:
            cursor.close()