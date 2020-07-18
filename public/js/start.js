$(document).ready(() => {
  // Getting references to our form and inputs
  const startForm = $("form.start");
  const emailInput = $("input#email-input");
  const nameInput = $("input#pname-input");

  // When the form is submitted, we validate there's an email and password entered
  startForm.on("submit", event => {
    event.preventDefault();
    const respondentData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim()
    };

    if (!userData.name || !userData.email) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    startSurvey(respondentData.name, respondentData.email);
    emailInput.val("");
    nameInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function startSurvey(name, email) {
    $.post("/api/start", {
      name: name,
      email: email
    })
      .then(() => {
        window.location.replace("/finish");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
