from database.db_manager import MySQLConnctionManager
from models.user_model import User, UserRepository
from mysql.connector import Error
from controllers.user_controller import UserController
from future.moves import configparser
from models.task_model import TaskRepository
from datetime import datetime

def main():
    try:
        config = configparser.ConfigParser()
        config.read('Python\config.ini')
        host = config.get("DB", "host")
        database = config.get("DB", "database")
        user = config.get("DB", "user")
        password = config.get("DB", "pass")

        db_manager = MySQLConnctionManager(host=host, database=database, user=user, password=password)
        
        user_repo = UserRepository(db_manager)
        user_controller = UserController(user_repo)
        
        print("Hi, I'm Task Manager App")
        
        user = None

        while user == None:
            reg_or_log = input("""First you must login or register in order to use the app.
If you already have an account enter 1 in order to login, else enter 2 to register: """)
            
            if reg_or_log == '1':
                username = input("Please enter your username: ")
                password = input("Please enter your password: ")
                user = user_controller.login_user(username, password)

            elif reg_or_log == '2':
                username = input("Please choose a username: ")
                password = input("Please enter a password: ")
                name = input("Please enter your name: ")
                user_controller.register_user(username, password, name)
            
            else:
                print("Invalid choice! Try again.")
                continue
    
        print("Here are your tasks")

        operation = input("Now what do you wanna do? ")
        if operation == '1':
            title = input("Enter the title: ")
            desc = input("Enter the description: ")
            category = input("Enter the category: ")
            due_date = input("Enter the date: ")
            if due_date == '':
                due_date = datetime.today()

            task_repo = TaskRepository(db_manager)
            task_repo.insert(title=title, desc=desc, category=category, due=due_date, username=user.username)

    except Error as e:
        print(f"Error while connecting to database: {e}")

main()