from views.task_view import TaskView

class TaskController:
    def __init__(self, task_repository) -> None:
        self.task_repository = task_repository

    def new_task(self, title, desc, category, due_date, username):
        self.task_repository.insert(title=title, desc=desc, category=category, due=due_date, username=username)

    def fetch_tasks_titles(self, username) -> tuple | None:
        tasks = self.task_repository.fetch_tasks(username)
        if tasks:
            titles = []
            for task in tasks:
                titles.append(task[1])
            return titles
        return None
    
    def fetch_task_details(self, username, title):
        task_details = self.task_repository.fetch_task_details(username, title)
        TaskView.task_details_view(task_details)
        return task_details