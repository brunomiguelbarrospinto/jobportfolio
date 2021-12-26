import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import TextareaInterface from "@/definitions/form/TextareaInterface";

const photo: InputInterface = {
  id: "photo",
  label: "Imagen de perfil",
  type: "file",
  value: null,
};

const name: InputInterface = {
  id: "name",
  label: "Nombre",
  type: "text",
  value: null,
  required: true,
};

const lastNames: InputInterface = {
  id: "lastNames",
  label: "Apellidos",
  type: "text",
  value: null,
};

const dateOfBirth: InputInterface = {
  id: "dateOfBirth",
  label: "Fecha de nacimieto",
  type: "date",
  value: null,
};

const address: InputInterface = {
  id: "address",
  label: "Dirección",
  type: "text",
  value: null,
};

const phone: InputInterface = {
  id: "phone",
  label: "Teléfono",
  type: "tel",
  value: null,
};

const biography: TextareaInterface = {
  id: "biography",
  label: "Biografia",
  value: null,
  rows: 10,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "Acerca de mi",
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
          },
          {
            type: "input",
            data: phone,
          },
          {
            type: "textarea",
            data: biography,
          },
        ],
      },
    ],
  };
};
