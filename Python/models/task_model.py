from mysql.connector import Error
from datetime import datetime
from views.task_view import TaskView


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
                        description varchar(255),
                        UNIQUE(title)
                        );""")
            cursor.execute("""CREATE TABLE IF NOT EXISTS tasks(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title varchar(255) NOT NULL,
                        description varchar(255),
                        category INT,
                        due_date DATE,
                        user varchar(255) NOT NULL,
                        status BOOL NOT NULL DEFAULT 0,
                        FOREIGN KEY (category) REFERENCES categories(id),
                        FOREIGN KEY (user) REFERENCES users(username)
                        );""")
            try:
                cursor.execute("INSERT IGNORE INTO categories (title, description) VALUES (%s, %s)", ('Urgent', 'Urgent Tasks'))
                cursor.execute("INSERT IGNORE INTO categories (title, description) VALUES (%s, %s)", ('Important', 'Important Tasks'))
            except Error:
                pass
            connection.commit()
            cursor.close()
        except Error as e:
            print(f"Error while creating table: {e}")

    def insert(self, title, category, username, desc='', due=datetime.today):
        print(due)
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO tasks (title, description, category, due_date, user) VALUES (%s, %s, %s, %s, %s)", (title, desc, category, due, username))
            connection.commit()
            return (True, '')
        except Error as e:
            return False, e
        finally:
            cursor.close()
    
    def fetch_tasks(self, username) -> tuple | None:
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM tasks WHERE user = %s", (username,))
            result = cursor.fetchall()
            return result
        except Error as e:
            return False, e
        finally:
            cursor.close()

    def fetch_task_details(self, username, title):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("""
                            SELECT tasks.id, tasks.title, tasks.description, categories.title as category_name, tasks.due_date, tasks.status
                            FROM tasks
                            JOIN categories ON tasks.category = categories.id
                            WHERE tasks.title = %s AND tasks.user = %s
                            """, (title, username))
            result = cursor.fetchone()
            if result:
                return {'title': result[1], 'description': result[2], 'category': result[3], 'due_date': result[4], 'status': result[5]}
            else:
                raise Error
        except Error as e:
            return False, e
        finally:
            cursor.close()

    def update_task(self, new_detail, username, title):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("UPDATE tasks SET title = %s, description = %s, category = %s, due_date = %s WHERE user = %s AND title = %s", (
                new_detail['title'],
                new_detail['description'],
                new_detail['category'],
                new_detail['due_date'],
                username,
                title,))
            connection.commit()
            return (True, '')
        except Error as e:
            return False, e
        finally:
            cursor.close()

    def delete_task(self, title, username):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("DELETE FROM tasks WHERE title = %s AND user = %s", (title, username))
            connection.commit()
            return (True, '')
        except Error as e:
            return False, e
        finally:
            cursor.close()

    def mark_done_task(self, title, username):
        connection = self._connection_manager.get_connection()
        cursor = connection.cursor()
        try:
            cursor.execute("UPDATE tasks SET status = 1 WHERE title = %s AND user = %s", (title, username))
            connection.commit()
            return (True, '')
        except Error as e:
            return False, e
        finally:
            cursor.close()