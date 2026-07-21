 const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('nav-links--open');
            menuIcon.textContent = navLinks.classList.contains('nav-links--open') ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-links--open');
                menuIcon.textContent = '☰';
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('nav-links--open') &&
                !navLinks.contains(e.target) &&
                !menuIcon.contains(e.target)) {
                navLinks.classList.remove('nav-links--open');
                menuIcon.textContent = '☰';
            }
        });
    }

    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    function validateName() {
        const value = nameInput.value.trim();

        if (value.length < 2) {
            nameError.textContent = "Name must be at least 2 characters.";
            nameError.style.display = "block";

            nameInput.classList.add('input-error');
            nameInput.classList.remove('input-success');

            return false;
        }

        nameError.textContent = "";
        nameError.style.display = "none";

        nameInput.classList.remove('input-error');
        nameInput.classList.add('input-success');   

        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(value)) {
            emailError.textContent = "Please enter a valid email address.";

            emailError.style.display = "block";

            emailInput.classList.add('input-error');
            emailInput.classList.remove('input-success');

            return false;
        }

        emailError.textContent = "";
        emailError.style.display = "none";  

        emailInput.classList.remove('input-error');
        emailInput.classList.add('input-success');

        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();

        if (value.length < 10) {
            messageError.textContent = "Message must be at least 10 characters.";

            messageError.style.display = "block";

            messageInput.classList.add('input-error');
            messageInput.classList.remove('input-success');
            return false;
        }

        messageError.textContent = "";
        messageError.style.display = "none";

        messageInput.classList.remove('input-error');
        messageInput.classList.add('input-success');
        return true;
    }

    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    form.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Form submitted");

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    console.log(isNameValid, isEmailValid, isMessageValid);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
    }

    console.log("Sending email...");

    emailjs.send("service_28fpwqm", "template_8eonv2e", {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value
})
.then((response) => {
    console.log("SUCCESS!", response);

    successMessage.textContent = "✓ Your message has been sent successfully!";
    successMessage.style.display = "block";

    form.reset();

    [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove("input-success");
        input.classList.remove("input-error");
    });

    nameError.style.display = "none";
    emailError.style.display = "none";
    messageError.style.display = "none";

    setTimeout(() => {
        successMessage.style.display = "none";
    }, 5000);
})
.catch((error) => {
    console.error("FAILED", error);

    successMessage.textContent = "❌ Something went wrong. Please try again.";
    successMessage.style.display = "block";
});
});