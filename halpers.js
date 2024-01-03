// localden parametre olarak gelen elemni alir
export const getStorage = () => {
  //localden key ile eslesen veriyi alma
  const strData = localStorage.getItem("notes");

  //gelen strig veriyi js verisine cevir ve dondur
  return JSON.parse(strData);
};

//locale paramertre olarak gelen elemani kaydeder
export const setStorage = (data) => {
  const strData = JSON.stringify(data);

  //locale kaydet
  localStorage.setItem("notes", strData);
};

// İKONLAR
export var userIcon = L.icon({
  iconUrl: "/images/Person.png",
  iconSize: [50, 50],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var homeIcon = L.icon({
  iconUrl: "/images/Home_8.png",
  iconSize: [50, 50],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var jobIcon = L.icon({
  iconUrl: "/images/Briefcase_8.png",
  iconSize: [50, 50],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var gotoIcon = L.icon({
  iconUrl: "/images/Aeroplane_8.png",
  iconSize: [50, 50],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

var parkIcon = L.icon({
  iconUrl: "/images/Parking_8.png",
  iconSize: [50, 50],
  popupAnchor: [0, -20],
  shadowUrl: "/images/my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [30, 34],
});

export const icons = {
  goto: gotoIcon,
  home: homeIcon,
  job: jobIcon,
  park: parkIcon,
};
