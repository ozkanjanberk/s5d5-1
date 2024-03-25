/* 
Öncelikle YOUR_API_KEY'i kendi api keyiniz ile değiştirin
*/

export const apiKey = "5770f587";

/*

Görev: DisplayMovieInfo fonksiyonunu aşağıdaki isterlere göre oluşturun.

1. Bir tane argüman alacak: film datasını içeren bir obje.
2. Eğer bu objenin içindeki "Response" özelliği string olarak "True" ise aşağıdaki movieInfo id'li div element'ini dönecek.

<div id="movieInfo">
  <h2>{Title}</h2>
  <p><span>Year:</span> {Year}</p>
  <p><span>Genre:</span> {Genre}</p>
  <p><span>Plot:</span> {plot}</p>
  <img src="{Poster}" alt="{Title}">
</div>

Eğer "Response" !== "True" ise aşağıdaki paragrafı dönecek

<p>No movie found with that title.</p>

*/

export function DisplayMovieInfo(data) {
  console.log(data);
  if (data.Response == "True") {
    const movieInfo = document.createElement("div");
    movieInfo.setAttribute("id", "movieInfo");
    const h2 = document.createElement("h2");
    h2.textContent = data.Title;
    const p1 = document.createElement("p");
    const sp1 = document.createElement("span");
    sp1.textContent = `Year: ${data.Year}`;
    const p2 = document.createElement("p");
    const sp2 = document.createElement("span");
    sp2.textContent = `Genre: ${data.Genre}`;
    const p3 = document.createElement("p");
    const sp3 = document.createElement("span");
    sp3.textContent = `Plot: ${data.Plot}`;
    const image = document.createElement("img");
    image.src = `${data.Poster}`;
    image.setAttribute("alt", `${data.Title} Poster`);
    p3.append(sp3);
    p2.append(sp2);
    p1.append(sp1);
    movieInfo.append(h2, p1, p2, p3, image);
    return movieInfo;
  } else {
    const hata = document.createElement("p");
    hata.textContent = "No movie found with that title.";
    return hata;
  }
}
