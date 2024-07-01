from models.user_model import User, UserRepository

class UserController:
    def __init__(self, user_repository) -> None:
        self.user_repository = user_repository

    def register_user(self, username, password, name):
        user = User(username=username, password=password, name=name)
        self.user_repository.register(user)

    def login_user(self, username, password):
        user = self.user_repository.login(username, password)
        # OBJECT
        if user:
            print("Logged in successfully")
            return user
        else:
            return None