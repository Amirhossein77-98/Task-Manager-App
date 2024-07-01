class TaskView:
    @staticmethod
    def task_creation_seccess():
        print("✅ Successfully created the task.")
    
    @staticmethod
    def task_creation_failure(error):
        print(f"❌ Error while creating the task: {error}")