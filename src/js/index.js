import { getUserData, getAllUserData } from "./user-service.js";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCarousel from "./user-carousel.js";
import User from "./user.js";
import UserModal from "./user-modal.js";

const showUserModal = (e) => {
  getUserData(e.target.dataset.id).then((responseData) => {
    let user = new User(responseData.data);
    userModal.showModal(user);
  });
};

const userCarousel = new UserCarousel(
  document.getElementById("carousel-container"),
  showUserModal
);

const userModal = new UserModal(
  document.getElementById("userModal"),
  userCarousel
);

const newProfileButton = document.getElementById("addNewProfileButton");

newProfileButton.addEventListener("click", () => {
  const data = {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
    id: "0"
  };
  let user = new User(data);
  userModal.showModal(user);
});

getAllUserData().then((responseData) => {
  let users = [];
  //let templates = [];

  for (let data of responseData.data) {
    let user = new User(data);

    //    let template = user.getTemplate();

    users.push(user);
    //templates.push(template);
  }

  //let node = document.getElementById("profile-container");

  //renderUserList(templates.join(""), node);

  userCarousel.render(users);
});

//const renderUserList = (template, node) => {
// node.innerHTML = template;
//};
