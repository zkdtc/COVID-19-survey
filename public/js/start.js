$(document).ready(() => {
  // Getting references to our form and inputs
  const startForm = $("form.start");
  const emailInput = $("input#email-input");
  const nameInput = $("input#name-input");
  const ageInput = $("input#age-input");

  // When the form is submitted, we validate there's an email and password entered
  startForm.on("submit", event => {
    event.preventDefault();
    const respondentData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      age: ageInput.val().trim()
    };

    // if (!userData.name || !userData.email) {
    //   return;
    // }

    // If we have an email and password we run the loginUser function and clear the form
    startSurvey(respondentData.name, respondentData.email, respondentData.age);
    emailInput.val("");
    nameInput.val("");
    ageInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function startSurvey(name, email, age) {
    console.log("startSurvey");
    console.log("startdata====>", name + " " + email, +" " + age);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("age", age);
    // $.post("/api/start", {
    $.post("/api/start", {
      name: name,
      email: email,
      age: age
    })
      .then(() => {
        window.location.replace("/api/questions");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }
});
