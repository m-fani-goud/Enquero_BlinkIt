function toggleForms() {
    document.getElementById("login-box").style.display =
        document.getElementById("login-box").style.display === "none" ? "block" : "none";
    document.getElementById("register-box").style.display =
        document.getElementById("register-box").style.display === "none" ? "block" : "none";
}

// REGISTER
document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const phone = document.getElementById("reg-phone").value;
    const pass = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!regex.test(pass)) { alert("Password must be 7+ chars with numbers and symbols."); return; }
    if (pass !== confirm) { alert("Passwords do not match!"); return; }
    if (!phoneRegex.test(phone)) { alert("Enter a valid 10-digit phone number."); return; }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, phone, password: pass });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully!");
    toggleForms();
});

// LOGIN
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const identifier = document.getElementById("login-identifier").value;
    const pass = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === pass);

    if (!user) { alert("Invalid details!"); return; }
    alert("Login Successfully!");
    document.querySelector(".container").style.display = "none";
    document.getElementById("welcome-page").style.display = "block";
});

// FORGOT PASSWORD
document.querySelector(".forgot-password").onclick = function () {
    document.getElementById("forgot-password-modal").style.display = "flex";
};

function closeForgotPassword() {
    document.getElementById("forgot-password-modal").style.display = "none";
}

document.getElementById("forgot-password-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const identifier = document.getElementById("fp-identifier").value;
    const newPass = document.getElementById("fp-new-password").value;
    const confirmPass = document.getElementById("fp-confirm-password").value;
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$/;

    if (!passRegex.test(newPass)) { alert("Password must include number + symbol and be 7+ characters!"); return; }
    if (newPass !== confirmPass) { alert("Passwords do not match!"); return; }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let index = users.findIndex(u => u.email === identifier || u.phone === identifier);
    if (index === -1) { alert("Email or Phone not found!"); return; }

    users[index].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password Reset Successfully!");
    closeForgotPassword();
});
