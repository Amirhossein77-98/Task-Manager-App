document.addEventListener('DOMContentLoaded', async () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const newTaskForm = document.getElementById("new-task-form");
    const usersTasksForm = document.getElementById("users-tasks");

    const currentUser = localStorage.getItem('authToken');

    if (!currentUser && usersTasksForm) {
        usersTasksForm.innerHTML = "<li>You should login first in order to load your tasks.</li>";
    }

    if (currentUser && usersTasksForm) {
        try {
            console.log("try");
            const response = await fetch('/index', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser}`
                }
            });

            if (response.ok) {
                const tasks = await response.json();
                usersTasksForm.innerHTML = tasks.map(task => `<li>${task.title}: ${task.status == 0? 'Done ✅' : 'Undone ❌'}</li>`).join('');
            } else {
                alert('Failed to load tasks');
            }
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            alert('You are not logged in');
            usersTasksForm.innerHTML = "<li>You should login first in order to load your tasks.</li>";
        }
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            const name = e.target.name.value;

            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, name }),
            });

            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert('Registration failed!');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('authToken', username);
                    alert('Login Successful!');
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                }
            } catch (error) {
                console.error('Failed to login: ', error);
            }
        });
    }

    if (newTaskForm) {
        newTaskForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("task-title").value;
            const description = document.getElementById("task-description").value;
            const category = document.getElementById("task-category").value;
            const dueDate = document.getElementById("task-due-date").value;
            const user = localStorage.getItem('authToken');

            const response = await fetch("/newTask", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, category, dueDate, user })
            });

            if (response.ok) {
                alert('Task created successfully!');
            } else {
                alert('Task creation failed!');
            }
        });
    }
});
