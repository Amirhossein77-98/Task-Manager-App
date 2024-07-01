class TaskView:
    @staticmethod
    def task_related_operations(operation, title='', error=None):
        if error:
            print(f"❌ Error while {operation} the task '{title}'")
        else:
            print(f"✅ Successfully {operation} the task '{title}'.")

    @staticmethod
    def task_details_view(task_details):
        print(f"Title: {task_details['title']}")
        print(f"Description: {task_details['description']}")
        print(f"Category: {task_details['category']}")
        print(f"Due Date: {task_details['due_date']}")
        status = 'Done' if task_details['status'] == '1' else "Undone"
        print(f"Status: {status}")