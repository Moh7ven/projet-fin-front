$(document).ready(() => {
  const verifToken = () => {
    const token = localStorage.getItem("tokenCovoitExpress");
    if (token == null) {
      window.location.href = "../connexion.html";
    }
  };
  verifToken();

  const deco = $("#deco");
  deco.click((e) => {
    e.preventDefault();
    localStorage.removeItem("tokenCovoitExpress");
    window.location.href = "../connexion.html";
  });

  const verifyChamp = () => {
    const date = $("#date").val();
    // const heure = date.split("T")[1];
    const lieuDepart = $("#lieuDepart").val();
    const lieuArrivee = $("#lieuArrivee").val();
    const prix = $("#cout").val();
    const note = $("#note").val();
    const message = $("#message");

    message.css("color", "red");

    if (lieuDepart == "") {
      message.text("Veuillez renseigner le lieu de depart");
      return false;
    }

    if (lieuArrivee == "") {
      message.text("Veuillez renseigner le lieu d'arrivee");
      return false;
    }

    if (date == "") {
      message.text("Veuillez renseigner la date");
      return false;
    }

    if (prix == "") {
      message.text("Veuillez renseigner le prix");
      return false;
    }

    if (note == "") {
      message.text("Veuillez renseigner une note");
      return false;
    }
    return true;
  };

  const createTrajet = () => {
    if (verifyChamp() == true) {
      const date = $("#date").val().split("T")[0];
      const heure = $("#date").val().split("T")[1];
      const lieuDepart = $("#lieuDepart").val();
      const lieuArrivee = $("#lieuArrivee").val();
      const prix = $("#cout").val();
      const note = $("#note").val();

      const data = {
        date: date,
        heure: heure,
        lieuDepart: lieuDepart,
        lieuArrivee: lieuArrivee,
        cout: prix,
        note: note,
      };

      $.ajax({
        type: "POST",
        url: "https://projet-fin-backend.onrender.com/api/v1/clients/add-trajet",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",

        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenCovoitExpress")}`,
        },
        success: function (data) {
          console.log(data.message);
          showPopup(data.message);
        },
        error: function (error) {
          console.log(error.responseJSON.message);
          showPopup(error.responseJSON.message);
        },
      });
    }
  };

  function showPopup(message) {
    const popup = `
        <div id="cd-pop-up" class="is-visible">
          <div id="popup-container" class="cd-popup-container">
            <p>${message}</p>
            <a href="#0" class="cd-popup-close" onclick="hidePopup()">x</a>
          </div>
        </div>
      `;
    $("body").append(popup);
  }

  window.hidePopup = function () {
    $("#cd-pop-up").remove();
    console.log("Popup fermé");
  };

  $("#save").click((e) => {
    e.preventDefault();
    createTrajet();

    // console.log($("#date").val().split("T")[1]);
  });
});
