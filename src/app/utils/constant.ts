import { IFormData } from "~models/form-data";
//const HOST = "https://whizlabs-node-service.herokuapp.com";
const HOST = "http://localhost:3020";

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

export const MockForm: IFormData[] = [
  {
    controlName: "Username",
    controlType: "text",
    valueType: "text",
    placeholder: "Enter username",
    validators: {
      required: true,
      minlength: 5,
    },
  },
  {
    controlName: "Telephone",
    placeholder: "Enter Phone",
    valueType: "tel",
    controlType: "text",
    validators: {
      required: true,
      minlength: 7,
      maxlength: 10,
    },
  },
  {
    controlName: "Email",
    valueType: "email",
    placeholder: "Enter email",
    controlType: "text",
    validators: {
      required: true,
    },
  },
  {
    controlName: "Gender",
    placeholder: "Select gender",
    controlType: "select",
    options: [
      {
        optionName: "Male",
        value: "male",
      },
      {
        optionName: "Female",
        value: "female",
      },
    ],
    validators: {
      required: true,
    },
  },
  {
    controlName: "Vehicle you own",
    placeholder: "Select vehicle",
    controlType: "radio",
    options: [
      {
        optionName: "I have a bike",
        value: "bike",
      },
      {
        optionName: "I have a car",
        value: "car",
      },
    ],
    validators: {
      required: true,
    },
  },
];
