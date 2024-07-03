document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById("register-form");

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
    }
})