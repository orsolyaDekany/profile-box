import { Modal } from "bootstrap";
import User from "./user.js";
import {
  createUserData,
  deleteUserData,
  updateUserData
} from "./user-service.js";

export default class UserModal {
  constructor(root, carousel) {
    this.userModal = new Modal(root);
    this.carousel = carousel;
    this.root = root;
    this.confirmModal = new Modal(document.getElementById("confirmModal"));
    this.users = [];
    this.template = `
      <div class="modal-header">
        <h5 class="modal-title">{first_name} {last_name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="user-form" data-id="{id}">
          <input id="id" name="id" value="{id}" type="hidden">
          <input id="avatar" name="avatar" value="{avatar}" type="hidden">
          <div class="first_name-container">
              <label for="first_name" class="form-label">First Name</label>
          <input type="text" class="form-control" id="first_name" name="first_name" value="{first_name}">
          </div>
          <div class="last_name-container">
            <label for="last_name" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="last_name" name="last_name" value="{last_name}">
          </div>
          <div class="email-container">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" value="{email}">
        </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="save-button" type="button" class="btn btn-primary" data-save="modal">Save</button>
        <button id="delete-button" type="button" class="btn btn-primary" data-id="{id}">Delete</button>
      </div>`;
  }

  processTemplate(template, data) {
    template = template.replaceAll("{avatar}", data.avatar);
    template = template.replaceAll("{first_name}", data.first_name);
    template = template.replaceAll("{last_name}", data.last_name);
    template = template.replaceAll("{email}", data.email);
    template = template.replaceAll("{id}", data.id);

    return template;
  }

  deleteProfile(id) {
    deleteUserData(id).then((responseData) => {
      this.carousel.removeItem(id);
      //this.removeProfile(id);
      this.hideConfirmModal();
      this.hideModal();
    });
  }

  hideConfirmModal() {
    this.confirmModal.hide();
  }

  hideModal() {
    this.userModal.hide();
  }

  saveChanges(user) {
    const id = user.getId();

    if (id !== "0") {
      updateUserData(id, user.getData()).then((responseData) => {
        user = new User(responseData);
        this.carousel.updateItem(user);
        //this.updateProfile(user);
        this.hideModal();
      });
    } else {
      createUserData(user.getData()).then((responseData) => {
        const user = new User(responseData);
        this.carousel.addItem(user);
        this.carousel.renderItem(user, false);
        this.carousel.toItem();
        //this.addProfile(user);
        //this.renderProfile(user);
        this.hideModal();
      });
    }
  }

  //renderProfile(user) {
  //  var div = document.createElement("div");
  //
  //  let carouselContainer = document.getElementById("carousel-container");
  //  div.innerHTML = user.getTemplate();
  //  carouselContainer.append(div);
  //}

  //addProfile(user) {
  //  this.users.push(user);
  //}

  //removeProfile(user) {
  // let userCardData = document.querySelector(
  //  ".card[data-id='" + user.id + "']"
  //);

  //userCardData.parentElement.remove();
  //id alapján megkeresni megfelelő node-t
  //}

  showModal(data) {
    const template = this.processTemplate(this.template, data);

    const modalContent = document.querySelector(".modal-content");

    modalContent.innerHTML = template;

    document.querySelector("#save-button").addEventListener("click", (e) => {
      const formData = document.querySelector("#user-form");
      const data = new FormData(formData);
      const user = new User(Object.fromEntries(data));
      this.saveChanges(user);
    });

    const deleteButton = document.querySelector("#delete-button");

    if (data.id !== "0") {
      deleteButton.addEventListener("click", (e) => {
        const yesButton = document.querySelector("#yesButton");

        yesButton.addEventListener("click", (e) => {
          this.deleteProfile(data.id);
        });
        this.confirmModal.show();
      });
    } else {
      deleteButton.remove();
    }

    this.userModal.show();
  }
}
