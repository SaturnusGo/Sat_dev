document.addEventListener("DOMContentLoaded", function () {
    const updateBtn = document.querySelector(".password-change-button button");

    updateBtn.addEventListener("click", function () {
        // Здесь вы можете добавить функционал для смены пароля
        alert("Пароль обновлен");
    });
});

/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) => {
	const input = document.getElementById(loginPass),
		iconEye = document.getElementById(loginEye);

	iconEye.addEventListener("click", () => {
		// Change password to text
		if (input.type === "password") {
			// Switch to text
			input.type = "text";

			// Icon change
			iconEye.classList.add("ri-eye-line");
			iconEye.classList.remove("ri-eye-off-line");
		} else {
			// Change to password
			input.type = "password";

			// Icon change
			iconEye.classList.remove("ri-eye-line");
			iconEye.classList.add("ri-eye-off-line");
		}
	});
};

showHiddenPass("login-pass", "login-eye");
