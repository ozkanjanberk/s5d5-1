import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { apiKey } from "./index.js";
import axios from "axios";
import { DisplayMovieInfo } from "./index.js";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
let dom, container;
beforeAll(async () => {
  dom = new JSDOM(html, { runScripts: "dangerously" });
  container = dom.window.document;

  let scriptElement = dom.window.document.createElement("script");
  scriptElement.textContent =
    DisplayMovieInfo.toString() +
    `document.getElementsByClassName("movie-container")[0].append(DisplayMovieInfo({Title: "Star Wars: Episode IV - A New Hope",Year: "1977",Genre: "Action, Adventure, Fantasy",Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth ...",Poster:"https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",Response: "True",}));
    document.querySelector("body").append(DisplayMovieInfo({Response: "False"}))`;

  dom.window.document.head.appendChild(scriptElement);

  await new Promise((resolve) => dom.window.addEventListener("load", resolve));
});

test("ApiKey başarı ile tanımlanmış.", async () => {
  expect(apiKey).not.toBe("YOUR_API_KEY");
});

test("ApiKey gerçekten çalışıyor.", async () => {
  const apiUrl = `https://www.omdbapi.com/?t=Starwars&apikey=${apiKey}`;
  const response = await axios.get(apiUrl);
  expect(response.data).toHaveProperty("Title", "Starwars: Goretech");
});

test("DisplayMovieInfo componenti div.movieInfo oluşturuyor.", async () => {
  const element = container.querySelector(".movie-container > div#movieInfo");
  expect(element).toBeInTheDocument();
});

test("div.movieInfo içinde doğru film başlığı ile  h2 tagi oluşturuluyor.", async () => {
  const element = container.querySelector(
    ".movie-container > div#movieInfo > h2"
  );
  expect(element.textContent).toBe("Star Wars: Episode IV - A New Hope");
});

test("Year bilgisi bir span içinde ilk paragraf taginde kullanılmış.", async () => {
  const element = container.querySelectorAll(
    ".movie-container > div#movieInfo > p > span"
  );

  expect(element[0]).toBeInTheDocument();
  expect(element[0]).toHaveTextContent("Year:");
});

test("Year bilgisi doğru metin ile -arada bir boşluk bırakılarak(örn: Year: 1977)- ilk paragrafa yerleştirilmiş.", async () => {
  const element = container.querySelectorAll(
    ".movie-container > div#movieInfo > p"
  );

  expect(element[0]).toBeInTheDocument();
  expect(element[0]).toHaveTextContent("Year: 1977");
});

test("Genre bilgisi bir span içinde ikinci paragraf taginde kullanılmış.", async () => {
  const element = container.querySelectorAll(
    ".movie-container > div#movieInfo > p > span"
  );

  expect(element[1]).toBeInTheDocument();
  expect(element[1]).toHaveTextContent("Genre:");
});

test("Genre bilgisi doğru metin ile -arada bir boşluk bırakılarak- ikinci paragrafa yerleştirilmiş.", async () => {
  const element = container.querySelectorAll(
    ".movie-container > div#movieInfo > p"
  );

  expect(element[1]).toBeInTheDocument();
  expect(element[1]).toHaveTextContent("Genre: Action, Adventure, Fantasy");
});

test("Plot bilgisi bir span içinde üçüncü paragraf taginde kullanılmış.", async () => {
  const element = container.querySelectorAll(
    ".movie-container > div#movieInfo > p > span"
  );

  expect(element[2]).toBeInTheDocument();
  expect(element[2]).toHaveTextContent("Plot:");
});

test("Plot bilgisi doğru metin ile -arada bir boşluk bırakılarak- üçüncü paragrafa yerleştirilmiş.", async () => {
  const element = container.querySelectorAll(
    ".movie-container > div#movieInfo > p"
  );

  expect(element[2]).toBeInTheDocument();
  expect(element[2]).toHaveTextContent(
    /Plot: Luke Skywalker joins forces with a Jedi Knight/i
  );
});

test("Film posteri #movieInfo içine son child doğru resim linki ile eklenmiş", async () => {
  const element = container.querySelector(
    ".movie-container > div#movieInfo > img:nth-child(5)"
  );

  expect(element).toBeInTheDocument();
  expect(element.src).toBe(
    "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg"
  );
});

test("Film posterine alt altributeu doğru metin ile eklenmiş.(Film başlığın sonundaki Poster yazısına dikkat)", async () => {
  const element = container.querySelector(
    ".movie-container > div#movieInfo > img:nth-child(5)"
  );

  expect(element).toBeInTheDocument();
  expect(element.alt).toBe("Star Wars: Episode IV - A New Hope Poster");
});

test("DisplayMovieInfo componenti Film bulunamadığında ekranda doğru metni içeren paragraf elementi dönüyor ", async () => {
  const element = container.querySelector("body > p");

  expect(element).toBeInTheDocument();
  expect(element.textContent).toBe("No movie found with that title.");
});
