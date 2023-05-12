document.addEventListener('DOMContentLoaded', () => {
    const emailForm = document.getElementById("register_form");
    const nameForm = document.getElementById("name-form");
    const passwordForm = document.getElementById("password-form");

    async function submitForm(url, formData) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });

            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            alert("Произошла ошибка. Пожалуйста, повторите попытку позже.");
        }
    }

    emailForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const formData = new FormData(e.target);
        const response = await submitForm("/register/email", formData);

        console.log(response);  // Добавьте эту строку

        if (response) {
            const { user_id } = response;
            document.getElementById("user_id").value = user_id;
            document.getElementById("user_id_2").value = user_id;
            emailForm.style.display = "none";
            nameForm.style.display = "block";
        }
    });

    nameForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const firstName = document.getElementById("first_name").value;
        const lastName = document.getElementById("last_name").value;
        const formData = new FormData(e.target);
        const response = await submitForm("/register/name", formData);

        if (response) {
            sessionStorage.setItem("first_name", firstName);
            sessionStorage.setItem("last_name", lastName);
            nameForm.style.display = "none";
            passwordForm.style.display = "block";
        }
    });

    passwordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await submitForm("/register/password", formData);

        if (response) {
            alert("Регистрация успешно завершена!");
            const { user_id } = response;
            window.location.href = `/profile/${user_id}`;
        }
    });
});

