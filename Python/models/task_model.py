from mysql.connector import Error
from datetime import datetime


class TaskRepository:
    def __init__(self, connection_manager) -> None:
        self._connection_manager = connection_manager
        self.create()

    def create(self):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""CREATE TABLE IF NOT EXISTS categories(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title varchar(255) NOT NULL,
                        description varchar(255)
                        );""")
            cursor.execute("""CREATE TABLE IF NOT EXISTS tasks(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title varchar(255) NOT NULL,
                        description varchar(255),
                        category INT,
                        due_date DATE,
                        user varchar(255) NOT NULL,
                        FOREIGN KEY (category) REFERENCES categories(id),
                        FOREIGN KEY (user) REFERENCES users(username)
                        );""")
            cursor.execute("INSERT INTO categories (title, description) VALUES (%s, %s)", ('Urgent', 'Urgent Tasks'))
            connection.commit()
            cursor.close()
        except Error as e:
            print(f"Error while creating database: {e}")

    def insert(self, title, category, username, desc='', due=datetime.today):
        print(due)
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO tasks (title, description, category, due_date, user) VALUES (%s, %s, %s, %s, %s)", (title, desc, category, due, username))
            connection.commit()
            print("Task created successfully")
        except Error as e:
            print(f"Error while creating the task: {e}")
        finally:
            cursor.close()