class MainView:
    @staticmethod
    def main_menu():
        pass

    @staticmethod
    def authentication():
        message = """
Hi. In order to use the app you should register or login to your account first.
Choose what you want to do:
1. Login, If you already have an account
2. Register, If you are a new user"""
        return message
    
    @staticmethod
    def operation_menu():
        message = """
1. New Task
2. View Task Detail
3. Update Task
4. Delete Task
5. Mark as Done
Choose the operation you want: """
        return message