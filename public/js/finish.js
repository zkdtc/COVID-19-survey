$(document).ready(() => {
  // Getting references to our form and inputs
  //const myChart1 = $("#myChart1");

  const ctx = document.getElementById("myChart1").getContext("2d");
  const nextForm = $("form.next");

  // When the form is submitted, we validate there's an email and password entered
  nextForm.on("submit", event => {
    event.preventDefault();
    window.location.replace("/charts");
  });

  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["<18", "18-35", "35-45", "45-55", "55-65", ">65"],
      datasets: [
        {
          label: "Respondent Age Distribution",
          data: [19, 28, 20, 16, 15, 10],
          backgroundColor: "green"
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 1.3,
            ticks: {
              max: 3
            }
          },
          {
            display: true,
            ticks: {
              autoSkip: false,
              max: 4
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
});
