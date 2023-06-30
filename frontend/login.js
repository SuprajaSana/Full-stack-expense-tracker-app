async function postUserDetails(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const obj = {
    email,
    password
    };
    
  try {
    const response = await axios.post("http://localhost:8000/user/login", obj);
    if (response.status === 200) {
      window.location.href="./expenses.html"
    } 

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
