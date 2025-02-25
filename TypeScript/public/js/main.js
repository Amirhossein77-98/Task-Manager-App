document.addEventListener('DOMContentLoaded', async () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const newTaskForm = document.getElementById("new-task-form");
    const usersTasksForm = document.getElementById("users-tasks");
    const taskDetailField = document.getElementById("task-details");
    const mainMenuButton = document.getElementById("main-menu");

    if (mainMenuButton) {
        mainMenuButton.addEventListener("click", (e) => {
            if (sessionStorage.getItem("task-id")) {
                sessionStorage.removeItem("task-id")
            } else {}
            window.location.href = "http://localhost:3000/"
        });
    }
    
    const currentUser = localStorage.getItem('authToken');

    if (!currentUser && usersTasksForm) {
        usersTasksForm.innerHTML = "<li>You should login first in order to load your tasks.</li>";
    }

    if (currentUser && usersTasksForm) {
        document.getElementById("user-section").innerHTML = `<span id="hi">👦 Hi ${currentUser}</span> <button id="logout-button" type="button">Logout</button>`
        document.getElementById("user-section").addEventListener("click", (e) => {
            localStorage.clear()
            sessionStorage.clear()
            window.location.reload()
        });

        try {
            const response = await fetch('/index', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${currentUser}`
                }
            });

            if (response.ok) {
                const tasks = await response.json();
                try {
                    usersTasksForm.innerHTML = tasks.map(task => `
                        <li>📎 ${task.title}: ${task.status == 0 ? 'Undone ❌' : 'Done ✅'}
                        <button class="detail-button" id="${currentUser}-${task.id}" onclick="redirectToTaskDetailsPage(${task.id})">Details</button>
                        </li>`).join('');    
                } catch (error) {
                    usersTasksForm.innerHTML = `<li>You have no tasks yet</li>`
                }
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
                localStorage.setItem("authToken", username)
                window.location.href = "http://localhost:3000/"
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
                    window.location.href = "http://localhost:3000/"
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
                const doAgain = confirm('Do you want to add another task?');
                doAgain ? newTaskForm.reset() : window.location.href = "http://localhost:3000/";
            } else {
                alert('Task creation failed!');
            }
        });
    };

    if (taskDetailField) {
        const taskId = sessionStorage.getItem('task-id');
        const userId = localStorage.getItem('authToken');
        const response = await fetch('/TaskDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskId, userId })
        });
    
        if (response.ok) {
    
            function convertSpansToFields() {
                const spans = document.querySelectorAll("span");
                const detailsDiv = document.getElementById("task-details");
    
                // Create a form to wrap the input fields and the new button
                const updateForm = document.createElement("form");
                updateForm.id = "update-form";
    
                spans.forEach(span => {
                    if (span.id == "task-category") {
                        const select = document.createElement("select");
                        select.innerHTML = `
                        <option value="1" ${span.textContent === "Urgent" ? "selected" : ""}>Urgent</option>
                        <option value="2" ${span.textContent === "Important" ? "selected" : ""}>Important</option>
                        `;
                        select.id = span.id;
                        span.replaceWith(select);
                    } else if (span.id == "task-status") {
                        const select = document.createElement("select");
                        select.innerHTML = `
                        <option value="0" ${span.textContent === "❌ Undone" ? "selected" : ""}>❌ Undone</option>
                        <option value="1" ${span.textContent === "✅ Done" ? "selected" : ""}>✅ Done</option>
                        `;
                        select.id = span.id;
                        span.replaceWith(select);
                    } else {
                        const input = document.createElement("input");
                        input.value = span.textContent;
                        input.id = span.id;
                        if (span.id == "task-dueDate") {
                            input.type = "date";
                        }
                        span.replaceWith(input);
                    }
                });
    
                detailsDiv.appendChild(updateForm);
    
                // Remove the previous button
                const taskUpdateButton = document.getElementById("update-button");
                if (taskUpdateButton) {
                    taskUpdateButton.remove();
                }
                const deleteButton = document.getElementById("delete-button");
                if (deleteButton) {
                    deleteButton.remove();
                }
    
                // Create a new submit button
                const updateButton = document.createElement("button");
                updateButton.innerText = "Submit";
                updateButton.type = "submit";
                updateButton.id = "update-submit-button";
                updateForm.appendChild(updateButton);
    
                // Add the submit event listener to the form
                updateForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
    
                    const taskId = sessionStorage.getItem("task-id");
                    const title = document.getElementById("task-title").value;
                    const description = document.getElementById("task-description").value;
                    const category = document.getElementById("task-category").value;
                    const dueDate = document.getElementById("task-dueDate").value;
                    const status = document.getElementById("task-status").value;
                    const user = localStorage.getItem('authToken');
    
                    const response = await fetch("/taskUpdate", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ taskId, title, description, category, dueDate, status, user })
                    });
                    
                    if (response.ok) {
                        alert("Task Updated Successfully!");
                        window.location.reload();
                    } else {
                        alert("Failed to update the task!");
                        window.location.reload();
                    }
                });
            }

            async function deleteTask() {
                const confirmation = confirm("Are you sure you want to delete this task?");

                if (confirmation) {
                    const response = await fetch("/deleteTask", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ taskId, userId })
                    });
    
                    if (response.ok) {
                        alert("Task deleted successfully")
                        sessionStorage.removeItem("task-id")
                        window.location.href = 'http://localhost:3000/'
                    } else {
                        alert("Failed to delete the task")
                    }
                } else {
                    alert("Ok, let's keep it")
                }


            }
    
            const details = await response.json();
    
            document.getElementById("page-title").innerHTML = `${details.title} Details`;
            document.getElementById("task-details").innerHTML = `
            📎 <b>Title:</b> <span id="task-title">${details.title}</span>
            <br>
            📝 <b>Description:</b> <span id="task-description">${details.description}</span>
            <br>
            📁 <b>Category:</b> <span id="task-category">${details.category == 1 ? "Urgent" : "Important"}</span>
            <br>
            📅 <b>Due Date:</b> <span id="task-dueDate">${details.due_date.split("T")[0]}</span>
            <br>
            ❔ <b>Status:</b> <span id="task-status">${details.status == 0 ? "❌ Undone" : "✅ Done"}</span>
            <br>
            <br>
            <div id="task-details-buttons">
                <button id="update-button" type="button">Update</button>
                <button id="delete-button" type="button">Delete</button>
            </div>
            `;
            document.getElementById("update-button").addEventListener("click", convertSpansToFields);
            document.getElementById("delete-button").addEventListener("click", deleteTask);
        };
    };
    
    
});
