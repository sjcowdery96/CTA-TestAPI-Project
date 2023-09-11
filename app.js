const url = "https://api.example.com/data";

fetch(url).then((res) => {
  res
    .json()
    .then((data) => {
      const rt = data.find((item) => item.label === "rt");
      console.log(rt);
    })
    .catch((err) => {
      console.log(err);
    });
});