function updateTime() {
  const now = Date.now();
  // Find the element by its data-testid attribute for easy targeting
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = now;
  }
}
updateTime();
setInterval(updateTime, 100);


document
  .getElementById("contact-form")
  .addEventListener("submit", handleFormSubmit);

/**
 * Utility function to show/hide error messages and manage ARIA attributes.
 * @param {string} fieldId - The ID of the input field (e.g., 'contact-email').
 * @param {boolean} show - True to show the error, false to hide it.
 * @param {string} message - The error message to display.
 */

function displayError(fieldId, show, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(
    `error-${fieldId.split("-")[1]}`
  );

  if (!input || !errorElement) return;

  // Update error visibility and content
  errorElement.textContent =
    message ||
    errorElement.getAttribute("data-default-message") ||
    "Invalid input.";
  if (show) {
    errorElement.classList.add("visible");
    input.setAttribute("aria-invalid", "true");
  } else {
    errorElement.classList.remove("visible");
    input.removeAttribute("aria-invalid");
  }
}

function clearAllErrors() {
  const fields = [
    "contact-name",
    "contact-email",
    "contact-subject",
    "contact-message",
  ];
  fields.forEach((id) => displayError(id, false));
  document.getElementById("success-message").style.display = "none";
}

/**
 * Validation Rule: Checks if a string is a valid email format.
 */
function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Handles form submission, performs client-side validation, and shows success/error messages.
 */
function handleFormSubmit(event) {
  event.preventDefault();
  clearAllErrors();

  let isValid = true;

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const subject = document.getElementById("contact-subject").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  // 1. Full Name Validation (Required)
  if (!name) {
    displayError("contact-name", true, "Full Name is required.");
    isValid = false;
  }

  // 2. Email Validation (Required & Format)
  if (!email) {
    displayError("contact-email", true, "Email is required.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    displayError("contact-email", true, "Please enter a valid email address.");
    isValid = false;
  }

  // 3. Subject Validation (Required)
  if (!subject) {
    displayError("contact-subject", true, "Subject is required.");
    isValid = false;
  }

  // 4. Message Validation (Required & Min Length)
  if (!message) {
    displayError("contact-message", true, "Message is required.");
    isValid = false;
  } else if (message.length < 10) {
    displayError(
      "contact-message",
      true,
      "Message must be at least 10 characters long."
    );
    isValid = false;
  }

  // --- Final Submission Handler ---
  if (isValid) {
    // In a real application, you would send data to a server here.
    console.log("Form Submitted Successfully:", {
      name,
      email,
      subject,
      message,
    });

    // Show success message
    document.getElementById("success-message").style.display = "block";

    // Reset form fields after successful submission
    document.getElementById("contact-form").reset();
  } else {
    // If invalid, focus on the first invalid field for A11Y
    const firstInvalid = document.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }
}
