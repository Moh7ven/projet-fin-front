$(document).ready(() => {
  const verifyToken = () => {
    const token = localStorage.getItem("tokenCovoitExpress");
    if (token) {
      return (window.location.href = "./acceuil.html");
    }
  };

  verifyToken();

  const submitBtn = $("#btn-submit");
  const verifChamp = () => {
    const tel = $("#tel").val();
    const password = $("#password").val();
    const message = $("#message");
    message.css("color", "red");

    if (tel === "") {
      message.text("Veuillez renseigner votre numéro de téléphone");
      return false;
    } else if (tel.length !== 10) {
      message.text("Le numéro de téléphone doit être de 10 caractères");
      return false;
    }

    if (password === "") {
      message.text("Veuillez renseigner votre mot de passe");
      return false;
    }

    return true;
  };

  const login = () => {
    const tel = $("#tel").val();
    const password = $("#password").val();
    console.log(verifChamp());
    if (verifChamp() == true) {
      const person = {
        tel,
        password,
      };
      $.ajax({
        type: "POST",
        url: "https://projet-fin-backend.onrender.com/api/v1/clients/login-client",
        data: person,

        success: function (data) {
          console.log(data);
          localStorage.setItem("tokenCovoitExpress", data.token);
          window.location.href = "./acceuil.html";
        },
        error: function (error) {
          $("#message").text(error.responseJSON.message);
          console.log(error.responseJSON.message);
        },
      });
    }
  };

  submitBtn.click((e) => {
    e.preventDefault();
    login();
    // window.location.href = "./acceuil.html";
  });
});
