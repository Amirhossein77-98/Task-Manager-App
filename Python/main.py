from database.db_manager import MySQLConnctionManager
from models.user_model import UserRepository
from mysql.connector import Error
from controllers.user_controller import UserController
from future.moves import configparser
from models.task_model import TaskRepository
from datetime import datetime
from views.main_view import MainView
from controllers.task_controller import TaskController


def authentication_menu(user_controller):
    current_user = None
    
    # Asking to login or register until no one is logged in
    while current_user == None:
        reg_or_log = input("▶️ Enter your choice: ")
        
        if reg_or_log == '1':
            credentials = login()
            current_user = user_controller.login_user(credentials[0], credentials[1])

        elif reg_or_log == '2':
            new_user_detail = register(user_controller)
            user_controller.register_user(new_user_detail[0], new_user_detail[1], new_user_detail[2])
            current_user = user_controller.login_user(new_user_detail[0], new_user_detail[1])
        
        else:
            print("❌ Invalid choice! Please enter 1 or 2.")
            continue
        
        return current_user

def login():
    print()
    username = input("👤 Please enter your username: ")
    password = input("🔑 Please enter your password: ")
    return (username, password)

def register(user_controller):
    while True:
        username = input("👤 Please choose a username: ")
        is_duplicate = user_controller.check_duplicate_username(username)
        if is_duplicate:
            print("This username is already taken, try another one.")
            continue
        else:
            break
    
    while True:
        password = input("🔑 Please enter a password: ")
        confirmation = input("🔑 Please enter the password again: ")
        if password == confirmation:
            break
        else:
            print("❌ Password and confirmation doesn't match, try again.")
            continue

    name = input("🪪 Please enter your name: ")
    return (username, password, name)

def get_required_data_from_user(operation, titles=None):
    
    if operation == 'new_task':
        title = input("📎Enter the title: ")
        desc = input("📝 Enter the description: ")
        category = input("📁 Enter the category\n1.Urgent\n2.Important\n: ")
        while True:
            try:
                due_date = input("📅 Enter the date (Format: YYYY-MM-DD) - Leave it blank to set today as due date: ")
                if due_date == '':
                        due_date = datetime.today()
                        break
                else:
                    due_date = datetime.strptime(due_date, '%Y-%m-%d')
                    break
            except ValueError:
                print(f"❌ Wrong date format. Please enter a date like this: {datetime.today()}")
                continue

        return (title, desc, category, due_date.strftime('%Y-%m-%d'))
    
    elif operation == 'update_task':
        print("⚠️ Leave blank the fields you don't want to change ⚠️")
        title = input("📎Enter the new title: ")
        desc = input("📝 Enter the new description: ")
        category = input("📁 Enter the new category\n1.Urgent\n2.Important\n: ")
        while True:
            try:
                due_date = input("📅 Enter the new date (Format: YYYY-MM-DD): ")
                if due_date == '':
                        due_date = datetime.today()
                        break
                else:
                    due_date = datetime.strptime(due_date, '%Y-%m-%d')
                    break
            except ValueError:
                print(f"❌ Wrong date format. Please enter a date like this: {datetime.today()}")
                continue
        return (title, desc, category, due_date)
    
    elif operation == 'choose_task':
        while True:
            try:
                task_title = input("📎Enter the task title you want: ").lower()
                if task_title not in [title.lower() for title in titles]:
                    raise ValueError
                return task_title
            except ValueError as e:
                print(f"🤔 Couldn't find {task_title} in your tasks! Try again.")
                continue

def fetch_config():
    config = configparser.ConfigParser()
    config.read('Python\config.ini')
    host = config.get("DB", "host")
    database = config.get("DB", "database")
    user = config.get("DB", "user")
    password = config.get("DB", "pass")
    return host, database, user, password


def main():
    try:
        # Connection to database
        host, database, user, password = fetch_config()
        db_manager = MySQLConnctionManager(host=host, database=database, user=user, password=password)
        
        # Defining repos and controllers
        user_repo = UserRepository(db_manager)
        user_controller = UserController(user_repo)
        task_repo = TaskRepository(db_manager)
        task_controller = TaskController(task_repo)
        
        # Authentication Step
        current_user = None
        MainView.horizontal_line()
        print(MainView.authentication())
        MainView.horizontal_line()
        current_user = authentication_menu(user_controller)
    
        # Main Menu
        while True:
            # Fetching user's tasks to display them after login
            user_tasks = task_controller.fetch_tasks_titles(current_user.username)

            print()
            MainView.horizontal_line()
            print("📜 Here are your tasks:")
            if user_tasks != None:
                for num, task in enumerate(user_tasks):
                    print(f"{num+1}. {task[0]}: {task[1]}")
            else:
                print("You have no tasks yet!")
            MainView.horizontal_line()
                
            operation = input(MainView.operation_menu())
            
            # Insert New Task
            if operation == '1':
                new_task_detail = get_required_data_from_user('new_task')
                task_controller.new_task(title=new_task_detail[0],
                                        desc=new_task_detail[1],
                                        category=new_task_detail[2],
                                        due_date=new_task_detail[3],
                                        username=current_user.username)
            # View a Task's Details
            elif operation == '2':
                task_to_view = get_required_data_from_user('choose_task', [task[0] for task in user_tasks])
                task_controller.fetch_task_details(current_user.username, task_to_view)
            
            # Update a Task
            elif operation == '3':
                task_to_update = get_required_data_from_user('choose_task', [task[0] for task in user_tasks])
                task_detail = task_controller.fetch_task_details(current_user.username, task_to_update)
                update = get_required_data_from_user('update_task')
                if update[0] != '':
                    task_detail['title'] = update[0]
                if update[1] != '':
                    task_detail['description'] = update[1]
                if update[2] != '':
                    task_detail['category'] = update[2]
                else:
                    task_detail['category'] = 1 if task_detail['category'] == 'Urgent' else 2
                if update[3] != '':
                    task_detail['due_date'] = update[3].strftime('%Y-%m-%d')
                else:
                    task_detail['due_date'] = task_detail['due_date'].strftime('%Y-%m-%d')
                
                print(task_to_update)
                task_controller.update_task(task_detail, current_user.username, task_to_update)
            
            # Delete a Task
            elif operation == '4':
                task_to_delete = get_required_data_from_user('choose_task', [task[0] for task in user_tasks])
                task_detail = task_controller.fetch_task_details(current_user.username, task_to_delete)
                confirmation = input(f"⚠️ Are you sure you want to delete {task_to_delete} (y/n)? ").lower()
                task_controller.delete_task(task_to_delete, current_user.username) if confirmation == "y" else print("🤷‍♂️ Operation Canceled.")

            # Mark a Task as Done
            elif operation == '5':
                task_to_mark = get_required_data_from_user('choose_task', [task[0] for task in user_tasks])
                task_controller.mark_done(task_to_mark, current_user.username)
            
            # Logout
            elif operation == '6':
                del current_user
                del user_repo
                del user_controller
                del task_repo
                del task_controller
                main()
                break

            # Exit Application
            elif operation.lower() == "exit" or operation == "7":
                break
            
            # Invalid choice handler
            else:
                print("🚫 Invalid choice, please choose a number between 1 and 7, or enter 'exit")
                continue

    except Error as e:
        print(f"❗Error while connecting to database: {e}")

if __name__ == '__main__':
    main()