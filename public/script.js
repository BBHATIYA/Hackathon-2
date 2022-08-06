const sendPostData = () => {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fname, lname, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // const message = document.getElementById("message");
      // message.innerText = data.msg;
      window.location.href = "http://localhost:3000/login.html";
    })
    .catch((e) => {
      console.log(e);
    });
};

const sendLogin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === 2) {
        window.location.href = "http://localhost:3000/news.html";
      } else {
        const message = document.getElementById("message");
        message.innerText = data.msg;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const sendGetData = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch(`http://localhost:5000/userlogin?email=${email}&password=${password}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const message = document.getElementById("message");
      message.innerText = data.msg;
    })
    .catch((e) => {
      console.log(e);
    });
};

function getNewsData(val) {
  fetch(
    `http://newsapi.org/v2/everything?q=${val}&apiKey=a3b897852a274e0c86d0af39cc3dfbe5`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.articles);
      addNewsToPAge(data.articles);
    })
    .catch((e) => {
      console.log(e);
    });
}
getNewsData("Israel");

document.getElementById("button").addEventListener("click", function () {
  const searchValue = document.getElementById("search").value;
  getNewsData(searchValue);
});

function addNewsToPAge(arr) {
  const root = document.getElementById("root");
  root.innerHTML = "";
  console.log(root);
  arr.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("news-class");
    const aTag = document.createElement("a");
    aTag.setAttribute("href", item.url);
    aTag.innerHTML = "Read more";
    const p = document.createElement("p");
    const image = document.createElement("img");
    image.setAttribute("src", item.urlToImage);
    image.classList.add("news-img");
    const datep = document.createElement("p");
    const datetext = document.createTextNode(`Updated: ${item.publishedAt}`);
    datep.appendChild(datetext);
    p.innerHTML = item.description;
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(aTag);
    div.appendChild(datep);

    root.appendChild(div);
  });
}
