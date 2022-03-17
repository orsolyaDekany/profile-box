export default class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.avatar = data.avatar;
    this.data = data;

    this.template = `<div class="card" data-id="{id}" style="width: 18rem;">
    <img src="{avatar}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{first_name} {last_name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button data-id="{id}" class="btn btn-info show-profile">Show yourself</button>
    </div>
  </div>`;
  }

  getTemplate() {
    return this.processTemplate(this.template, this.data);
  }

  getData() {
    return this.data;
  }

  getId() {
    return this.id;
  }

  updateData(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.data = user.getData();
  }

  processTemplate(template, data) {
    template = template.replaceAll("{avatar}", data.avatar);
    template = template.replaceAll("{first_name}", data.first_name);
    template = template.replaceAll("{last_name}", data.last_name);
    template = template.replaceAll("{id}", data.id);

    return template;
  }
}
