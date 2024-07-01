class TaskView:
    @staticmethod
    def task_creation_seccess():
        print("✅ Successfully created the task.")
    
    @staticmethod
    def task_creation_failure(error):
        print(f"❌ Error while creating the task: {error}")

    @staticmethod
    def fetch_error(error):
        print(f"❌ Error while fetching the tasks: {error}")
    
    @staticmethod
    def task_detail_fetch_error(error):
        print(f"❌ Error while fetching the task's details: {error}")

    @staticmethod
    def task_details_view(task_details):
        print(f"Title: {task_details['title']}")
        print(f"Description: {task_details['description']}")
        print(f"Category: {task_details['category']}")
        print(f"Due Date: {task_details['due_date']}")
        status = 'Done' if task_details['status'] == '1' else "Undone"
        print(f"Status: {status}")