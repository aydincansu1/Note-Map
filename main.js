//!farkli dosyalardan gelen veriler
import { setStorage, getStorage, icons, userIcon } from "./halpers.js";

//!html elemanlarini cagirma
const form = document.querySelector("form");
const noteList = document.querySelector("ul");
const open = document.getElementById("open");
const closed = document.getElementById("closed");
const aside = document.querySelector("aside");
console.log(aside);

//! global degiskenler(kodun her yerinden erisilenilen)
let cords;
let notes = getStorage() || [];
let markerLayer = [];
let map;

//*haritayi ekrana basan fonksiyon
function loadMap(coords) {
  map = L.map("map").setView(coords, 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //imlecleri tutacaginiz ayri bir katman olusturma
  markerLayer = L.layerGroup().addTo(map);

  //kullanicinin konumuna imlec bas
  L.marker(coords, { icon: userIcon }).addTo(map);

  //localden gelen verileri ekrana bas
  renderNoteList(notes);

  //haritadaki tiklanma olaylarinda calisacak
  map.on("click", onMapClick);
}

//*haritadaki tiklanma olaylarinda calisir
function onMapClick(e) {
  // tiklanan yerin konumuna eris global degiskene ata
  cords = [e.latlng.lat, e.latlng.lng];

  //formu goster
  form.style.display = "flex";

  //ilk inputa odaklan
  form[0].focus();
}

//iptal butonuna tiklanirsa formu temizleme ve kapatma
form[3].addEventListener("click", () => {
  // formu kapat
  form.style.display = "none";

  //formu temizle
  form.reset();
});

//form gonderilirse yeni bir not olustur ve storage kaydet
form.addEventListener("submit", (e) => {
  // 1-yenilemeyi engelle
  e.preventDefault();
  // 2- inputlardaki verilerden bir note objesi olustur
  const newNote = {
    id: new Date().getTime(),
    title: form[0].value,
    date: form[1].value,
    status: form[2].value,
    coords: cords,
  };

  // 3-dizinin basina yeni notu ekle
  notes.unshift(newNote);

  // 4-note lari listele
  renderNoteList(notes);

  // 5- local stroge guncelle
  setStorage(notes);

  // 6- formu kapat
  form.style.display = "none";
  form.reset();
});

// *ekrana notlari basar
function renderNoteList(items) {
  //onceden eklenen elkemanlari temizle
  noteList.innerHTML = "";
  markerLayer.clearLayers();

  items.forEach((note) => {
    // li elamani olustir
    const listElement = document.createElement("li");

    //data-id ekle
    listElement.dataset.id = note.id;

    //icerigi belirle
    listElement.innerHTML = `<div class="info">
    <p>${note.title}</p>
    <p><span>Tarih : </span> <span>${note.date}</span></p>
    <p><span>Durum : </span><span>${note.status}</span></p>
  </div>
  <div class="icons">
    <i id="fly" class="bi bi-airplane"></i>
    <i id="delete" class="bi bi-trash"></i>
  </div>`;
    //elemani liseye ekle
    noteList.appendChild(listElement);
    //elemani haritaya ekleme
    renderMarker(note);
  });
}

// not icin imlec katmaninana yeni bir imlec ekler
function renderMarker(note) {
  //imlec olusturma
  L.marker(note.coords, { icon: icons[note.status] })
    //imleci katmana ekle
    .addTo(markerLayer)
    .bindPopup(note.title);
}

//*kullanicinin konumunu alma
navigator.geolocation.getCurrentPosition(
  //konumu alirsa calisacak fonksiyon
  (e) => {
    loadMap([e.coords.latitude, e.coords.longitude]);
  },
  //konumu alamazsa calisacak fonksiyon
  () => {
    loadMap([41.024517138812676, 29.014054529696004]);
  }
);

// silme ucus
noteList.addEventListener("click", (e) => {
  //tiklanilan elemanin idsine erisme
  const found_id = e.target.closest("li").dataset.id;
  if (e.target.id === "delete" && confirm("silme islemini onayliyor musunuz")) {
    notes = notes.filter((note) => note.id != found_id);

    //locali guncelle
    setStorage(notes);
    //ekrani guncelle
    renderNoteList(notes);
  }
  if (e.target.id === "fly") {
    const note = notes.find((note) => note.id == found_id);

    map.flyTo(note.coords);
  }
});

function toggleVisibility() {
  open.classList.toggle("hide");
  closed.classList.toggle("hide");
}

function toggleMenuVisibility() {
  aside.classList.toggle("hide");
}

closed.addEventListener("click", function () {
  toggleVisibility();
  toggleMenuVisibility();
});

open.addEventListener("click", function () {
  toggleVisibility();
  toggleMenuVisibility();
});
