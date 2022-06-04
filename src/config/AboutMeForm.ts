import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import TextareaInterface from "@/definitions/form/TextareaInterface";

const photo: InputInterface = {
  id: "photo",
  label: "Profile picture",
  type: "file",
  value: null,
};

const name: InputInterface = {
  id: "name",
  label: "Names",
  type: "text",
  value: null,
  required: true,
};

const lastNames: InputInterface = {
  id: "lastNames",
  label: "Surnames",
  type: "text",
  value: null,
};

const dateOfBirth: InputInterface = {
  id: "dateOfBirth",
  label: "Date of birth",
  type: "date",
  value: null,
};

const address: InputInterface = {
  id: "address",
  label: "Address",
  type: "text",
  value: null,
};

const phone: InputInterface = {
  id: "phone",
  label: "Telephone",
  type: "tel",
  value: null,
};

const biography: TextareaInterface = {
  id: "biography",
  label: "Biography",
  value: null,
  rows: 10,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "About me",
        elements: [
          {
            type: "input",
            data: photo,
          },
          {
            type: "input",
            data: name,
          },
          {
            type: "input",
            data: lastNames,
          },
          {
            type: "input",
            data: dateOfBirth,
          },
          {
            type: "input",
            data: address,
            translatable: true,
          },
          {
            type: "input",
            data: phone,
          },
          {
            type: "textarea",
            data: biography,
            translatable: true,
          },
        ],
      },
    ],
  };
};
