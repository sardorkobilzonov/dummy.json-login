const formEl = document.querySelector(".form");
const [username, password, btn] = formEl.children;

const BASE_URL = "https://dummyjson.com";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = {
    username: username.value,
    password: password.value,
  };

  btn.setAttribute("disabled", true);
  btn.textContent = "Loading...";

  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("username or password is incorrect");
      }

      return res.json();
    })
    .then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      open("/pages/dashboard.html", "_self");
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      btn.removeAttribute("disabled");
      btn.textContent = "Login";
    });
});
