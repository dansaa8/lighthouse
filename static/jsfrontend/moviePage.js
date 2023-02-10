/* const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const rating = document.querySelector(".rating");
const commentField = document.querySelector(".comment-field");
 */
const sendBtn = document.querySelector(".send-btn");

//get id from url
const idUrl = new URL(document.URL).pathname.split("/");
const movieId = idUrl.pop() || idUrl.pop();

if (sendBtn) {
  getMovieRating();

  sendBtn.addEventListener("click", function () {
    event.preventDefault();
    jwtSendReview();
  });
}

/*  async function sendForm() {
  if (firstName.value === "") {
    alert("Du har inte fyllt förnamn");
  } else if (lastName.value === "") {
    alert("Du har inte fyllt efternamn");
  } else if (commentField.value === "") {
    alert("Du har inte angivit någon kommentar");
  } else {
    await fetch(`${movieId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        data: {
          comment: commentField.value,
          rating: rating.value,
          author: firstName.value + " " + lastName.value,
          verified: true,
          movie: movieId,
        },
      }),
    });
  }
}  */
async function getMovieRating() {
  const response = await fetch(`/movies/${movieId}/rating`);
  const dataJson = await response.json();
  document.querySelector(".movie-rating").append(dataJson.body);
}

/* document.querySelector(".testBtn").addEventListener("click", function () {
  event.preventDefault();
}); */

async function jwtSendReview() {
  //get id from url
  const idUrl = new URL(document.URL).pathname.split("/");
  const movieId = idUrl.pop() || idUrl.pop();

  const firstName = document.querySelector(".firstName").value;
  const lastName = document.querySelector(".lastName").value;
  const capitalCityStockholm = document.querySelector(".capital-city").value;
  const rating = document.querySelector(".rating").value;
  const commentField = document.querySelector(".comment-field").value;

  const credentials = `${firstName}:${lastName}`;
  const b64 = btoa(credentials);

  const data = { capital: capitalCityStockholm };

  const resToken = await fetch(`/movies/${movieId}/sendReview`, {
    method: "POST",

    headers: {
      Authorization: "Basic " + b64,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      data,
    }),
  });
  const dataToken = await resToken.json();

  await fetch(`/movies/${movieId}/protected`, {
    headers: { Authorization: "Bearer " + dataToken.token },
  });

  //om den inkluderar JWT token
  if (dataToken.token) {
    if (firstName === "") {
      alert("Du har inte fyllt förnamn");
    } else if (lastName === "") {
      alert("Du har inte fyllt efternamn");
    } else if (commentField === "") {
      alert("Du har inte angivit någon kommentar");
    }
    console.log(rating);
    /*   
    await fetch(`${movieId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        data: {
          comment: commentField,
          rating: rating,
          author: firstName + " " + lastName,
          verified: true,
          movie: movieId,
        },
      }),
    }); */
  } else {
    alert("hello");
  }
}
