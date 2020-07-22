$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
  const radio = $("input:radio");
  const answers = [];

  $("#submitBtn").on("submit", (event) => {
    event.preventDefault();

    radio.forEach((element) => {
      if (element.is(":checked")) {
        answers.push(element.text());
      }
    });

    sendAnswer(answers);
  });

  function sendAnswer(name) {
    $.post("/api/question", {
      answers: name,
    })
      .then(() => {
        window.location.replace("/finish");
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
