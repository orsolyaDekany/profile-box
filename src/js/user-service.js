import { sendHttpRequest } from "./xhr.js";
const maxId = 100;
const minId = 10;

function randomIdGenerator(minId, maxId) {
  return Math.floor(Math.random() * (maxId - minId) + minId);
}

export const createUserData = (data) => {
  return sendHttpRequest("POST", "https://reqres.in/api/users/", data).then(
    (responseData) => {
      data.id = randomIdGenerator(minId, maxId);
      return data;
    }
  );
};

export const updateUserData = (id, data) => {
  return sendHttpRequest("PUT", "https://reqres.in/api/users/" + id, data).then(
    (responseData) => {
      return responseData;
    }
  );
};

export const deleteUserData = (id) => {
  return sendHttpRequest("DELETE", "https://reqres.in/api/users/" + id).then(
    (responseData) => {
      return responseData;
    }
  );
};

export const getUserData = (id) => {
  return sendHttpRequest("GET", "https://reqres.in/api/users/" + id).then(
    (responseData) => {
      return responseData;
    }
  );
};

export const getAllUserData = () => {
  return sendHttpRequest("GET", "https://reqres.in/api/users/").then(
    (responseData) => {
      return responseData;
    }
  );
};
