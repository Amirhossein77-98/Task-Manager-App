from mysql.connector import Error

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
        except Error as e:
            print(f"Error while creating the table: {e}")

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
            print(f"Error while reading the user: {e}")
        finally:
            cursor.close()
    
    def update(self, user) -> None:
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("UPDATE users SET username = %s, password = %s, name = %s", (user.username, user.password, user.name))
            connection.commit()
            print("Successfully updated the user")
        except Error as e:
            print(f"Error while updating the user: {e}")
        finally:
            cursor.close()
    
    def delete(self, username, password):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("DELETE FROM users WHERE username = %s && password = %s", (username, password))
            connection.commit()
            print("User deleted successfully.")
        except Error as e:
            print(f"Error while deleting the user: {e}")
        finally:
            cursor.close()

    def register(self, user):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO users (username, password, name) VALUES (%s, %s, %s)", (user.username, user.password, user.name))
            connection.commit()
            print("You registered successfully!")
        except Error as e:
            print(f"Error while creating the user: {e}")
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
            print(f"Error while logging in user: {e}")
            return None
        finally:
            cursor.close()