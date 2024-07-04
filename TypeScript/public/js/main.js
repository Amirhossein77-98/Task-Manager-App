document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const newTaskForm = document.getElementById("new-task-form")

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
                body: JSON.stringify({username, password, name}),
            });
        })
    } else if (loginForm) {
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
                    body: JSON.stringify({username, password})
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('authToken', username);
                    alert('Login Successfull!');
                } else {
                    const error = await response.json();
                    alert(`Error: ${error.message}`);
                }
            } catch (error) {
                console.error('Failed to login: ', error);
            }

        })
    } else if (newTaskForm) {
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
                body: JSON.stringify({title, description, category, dueDate, user})
            });
        })
    }
})