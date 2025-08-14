const domain = "http://localhost:8000";

const Api = {
  signup: {
    url: `${domain}/user/signup`,
    method: "post",
  },
  login: {
    url: `${domain}/user/login`,
    method: "post",
  },
  allUsers: {
    url: `${domain}/user`,
    method: "get",
  },
  userDetail: {
    url: `${domain}/user/userDetail`,
    method: "get",
  },
  postPet: {
    url: `${domain}/pets`,
    method: "post",
  },
  allPets: {
    url: `${domain}/pets`,
    method: "get",
  },
  petDetail: {
    url: `${domain}/pets/:id`,
    method: "get",
  },
  updatePet: {
    url: `${domain}/pets/:id`,
    method: "put",
  },
  deletePet: {
    url: `${domain}/pets/:id`,
    method: "delete",
  },
};

export default Api;
