class TaskController:
    def __init__(self, task_repository) -> None:
        self.task_repository = task_repository

    def new_task(self, title, desc, category, due_date, username):
        self.task_repository.insert(title=title, desc=desc, category=category, due=due_date, username=username)