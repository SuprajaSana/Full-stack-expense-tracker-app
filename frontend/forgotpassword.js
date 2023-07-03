async function postEmailDetails(e) {
  e.preventDefault();
  const email = e.target.email.value;

  try {
    const response = await axios.post("http://localhost:8000/user/forgotpassword", email);
    if (response.status === 201) {
      window.location.href = "./login.html";
    } else {
      throw new Error("Failed to submit email");
    }
    document.getElementById("email").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
