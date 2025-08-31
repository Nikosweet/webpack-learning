module.exports = class UserDto {
  mail;
  id;
  isActivated;

  constructor(model) {
    this.mail = model.mail
    this.id = model.id
    this.isActivated = model.isactivated
  }
}