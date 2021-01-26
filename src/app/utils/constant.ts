import { IFormData } from "~models/form-data";
const HOST = "https://whizlabs-node-service.herokuapp.com";
//const HOST = "http://localhost:3020";

export const CONSTANT = {
  permissions: {},
  routes: {
    authorization: {
      login: HOST + "/user/login",
      logout: HOST + "/user/logout",
    },
    user: {
      get: HOST + "/user/:id",
      get_division: HOST + "/user/division/:id",
      get_division_field: HOST + "/division-field/division/:id",
    },
    project_data: {
      list: HOST + "/project-data",
      delete: HOST + "/project-data/delete/:id",
      save: HOST + "/project-data/save",
      get: HOST + "/project-data/:id",
      update: HOST + "/project-data/edit/:id",
      get_by_userid: HOST + "/project-data/user/:id",
      get_form_field: HOST + "/project-data/form-field/:userId/:divisionId",
    },
  },
};

export const TREE_DATA = JSON.stringify({
  Documents: {
    React: {
      src: {
        compiler: "ts",
        core: "ts",
      },
    },
    Angular: {
      src: {
        button: "ts",
        checkbox: "ts",
        input: "ts",
      },
    },
  },
});
