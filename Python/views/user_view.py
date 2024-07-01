class UserView:
    @staticmethod
    def display_login_result(user):
        if user != None:
            print(f"✅ Welcome {user.name}!")
        else:
            print("❌ Login failed! Please check your username and password!")
    
    @staticmethod
    def user_operations_failure(operation, error):
        print(f"❌ Error while {operation} the user: {error}")
    
    @staticmethod
    def user_operations_success(operation):
        print(f"✅ Successfully {operation} the user")

    @staticmethod
    def table_creation_error(error):
        print(f"❌ Error while creating the table: {error}")