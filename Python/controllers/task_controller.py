from views.task_view import TaskView

class TaskController:
    def __init__(self, task_repository) -> None:
        self.task_repository = task_repository

    def new_task(self, title, desc, category, due_date, username):
        new_task_creation = self.task_repository.insert(title=title, desc=desc, category=category, due=due_date, username=username)
        if new_task_creation[0]:
            TaskView.task_related_operations('created', title)
        else:
            TaskView.task_related_operations('creation', title, error=new_task_creation[1])

    def fetch_tasks_titles(self, username) -> list | None:
        tasks = self.task_repository.fetch_tasks(username)
        if tasks == []:
            return None
        elif tasks != [] and tasks[0] != False:
            titles = []
            for task in tasks:
                titles.append((task[1], "✅Done" if task[6] == 1 else "❌Undone"))
            return titles
        TaskView.task_related_operations('fetching', error=tasks[1])
        return None
    
    def fetch_task_details(self, username, title):
        task_details = self.task_repository.fetch_task_details(username, title)
        if task_details or task_details[0]:
            TaskView.task_details_view(task_details)
            return task_details
        else:
            TaskView.task_related_operations('fetching details of', title, error=task_details[1])
    
    def update_task(self, new_detail, username, title):
        updated = self.task_repository.update_task(new_detail, username, title)
        if updated[0]:
            TaskView.task_related_operations('Updated', title)
        else:
            TaskView.task_related_operations('Updating', title, error=updated[1])

    def delete_task(self, title, username):
        deleted = self.task_repository.delete_task(title, username)
        if deleted[0]:
            TaskView.task_related_operations("deleted", title)
        else:
            TaskView.task_related_operations("deleting", title, error=deleted[1])

    def mark_done(self, title, username):
        marked = self.task_repository.mark_done_task(title, username)
        if marked[0]:
            TaskView.task_related_operations('marked', title + ' as done')
        else:
            TaskView.task_related_operations('marking', title+' as done', error=marked[1])