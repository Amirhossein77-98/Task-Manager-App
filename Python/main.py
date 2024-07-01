from database.db_manager import MySQLConnctionManager
from models.user_model import UserRepository
from mysql.connector import Error
from controllers.user_controller import UserController
from future.moves import configparser
from models.task_model import TaskRepository
from datetime import datetime
from views.main_view import MainView
from controllers.task_controller import TaskController

def get_required_data_from_user(operation, titles=None):
    if operation == 'login':
        username = input("Please enter your username: ")
        password = input("Please enter your password: ")
        return (username, password)
    
    elif operation == 'register':
        username = input("Please choose a username: ")
        password = input("Please enter a password: ")
        name = input("Please enter your name: ")
        return (username, password, name)
    
    elif operation == 'new_task':
        title = input("Enter the title: ")
        desc = input("Enter the description: ")
        category = input("Enter the category: ")
        due_date = input("Enter the date: ")
        if due_date == '':
                due_date = datetime.today()
        return (title, desc, category, due_date)
    
    elif operation == 'view_task_detail':
        while True:
            try:
                task_title = input("Enter the task title that you want to see its details: ").lower()
                if task_title not in [title.lower() for title in titles]:
                    raise ValueError
                return task_title
            except ValueError as e:
                print(f"Couldn't find {task_title} in your tasks! Try again.")

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
        task_repo = TaskRepository(db_manager)
        task_controller = TaskController(task_repo)
        
        user = None
        print(MainView.authentication())
        while user == None:
            reg_or_log = input("Enter your choice: ")
            
            if reg_or_log == '1':
                credentials = get_required_data_from_user('login')
                user = user_controller.login_user(credentials[0], credentials[1])

            elif reg_or_log == '2':
                new_user_detail = get_required_data_from_user('register')
                user_controller.register_user(new_user_detail[0], new_user_detail[1], new_user_detail[2])
            
            else:
                print("Invalid choice! Please enter 1 or 2.")
                continue
    
        user_tasks = task_controller.fetch_tasks_titles(user.username)
        print("Here are your tasks:")
        for num, task in enumerate(user_tasks):
            print(f"{num+1}. {task}")


        operation = input(MainView.operation_menu())
        
        if operation == '1':
            new_task_detail = get_required_data_from_user('new_task')
            task_controller.new_task(title=new_task_detail[0],
                                     desc=new_task_detail[1],
                                     category=new_task_detail[2],
                                     due_date=new_task_detail[3],
                                     username=user.username)
        if operation == '2':
            task_to_view = get_required_data_from_user('view_task_detail', user_tasks)
            task_details = task_controller.fetch_task_details(user.username, task_to_view)

    except Error as e:
        print(f"Error while connecting to database: {e}")

main()