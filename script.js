const toast = document.getElementById("toast");
const toastProgress = document.getElementById("toast-progress");
const toastExit = document.getElementById("toast__exit");
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit_btn");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fData = new FormData(form);

  submitBtn.innerText = "Submitting...";
  submitBtn.disabled = true;
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbwvgN-miulC_5T60M4UxIB8d603ytyISYIem3m0msBEebBZIch9vaIgmgTUKM4_HtNM/exec",
    {
      method: "POST",
      body: fData,
    }
  );

  if (!res.ok) {
    alert("Something Went Wrong!");
    submitBtn.innerText = "Send Message";
    submitBtn.disabled = false;
    return;
  }

  const result = await res.json();
  console.log(result);

  if (result.result != "success") {
    alert("Something Went Wrong!");
    submitBtn.innerText = "Send Message";
    submitBtn.disabled = false;
    return;
  }

  submitBtn.innerText = "Send Message";
  submitBtn.disabled = false;
  form.reset();
  toast.classList.add("active");
  toastProgress.style.animationDuration = "2000ms";

  setTimeout(() => {
    toast.classList.remove("active");
  }, 2000);
});

toastExit.addEventListener("click", (e) => {
  if (toast.classList.contains("active")) {
    toast.classList.remove("active");
  }
});
