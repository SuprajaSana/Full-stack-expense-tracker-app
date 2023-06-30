async function postUserDetails(e) {
  e.preventDefault();
  const userName = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const obj = {
    userName,
    email,
    password,
  };

  console.log(obj);
  try {
    const response = await axios.post(
      "http://localhost:8000/user/signup",
      obj
    );
    if (response.status === 201) {
      window.location.href = "./login.html";
    } else {
      throw new Error("Failed to signup");
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
