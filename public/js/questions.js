$(document).ready(() => {
  const radio = $("input:radio");
  const answers = [];

  $("#submitAnswersForm").on("submit", event => {
    event.preventDefault();

    radio.each((index, element) => {
      console.log("answers===>", element);
      if ($(element).is(":checked")) {
        answers.push({
          choiceId: element.id,
          questionId: element.name,
          text: $(element).data("text")
        });
      }
    });
    console.log("answers===>", answers);
    sendAnswer(answers);
  });

  function sendAnswer(answers) {
    $.post("/api/answers", {
      // am i sending all answers in an array or each response?
      answers,
      email: localStorage.getItem("email")
    })
      .done(resp => {
        console.log("resp==>>>>", resp);
        window.location.replace("/finish"); // point to /api/questions
        //window.location.replace("/finish");
        // If there's an error, log the error
      })
      .fail(err => {
        console.log("an error occurred", err);
      });
  }
});
