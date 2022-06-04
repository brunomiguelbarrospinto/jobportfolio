import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";

const name = (): InputInterface => ({
  id: "name",
  label: "Name",
  type: "text",
  value: null,
  required: true,
});

const url = (): InputInterface => ({
  id: "url",
  label: "Web",
  type: "text",
  value: null,
});

const logo = (): InputInterface => ({
  id: "logo",
  label: "Logo",
  type: "file",
  value: null,
});

const description = (): InputInterface => ({
  id: "description",
  label: "Description",
  type: "text",
  value: null,
  required: true,
});

export default (isNew: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Nuevo proyecto" : "Editar proyecto",
        elements: [
          {
            type: "input",
            data: name(),
          },
          {
            type: "input",
            data: url(),
          },
          {
            type: "input",
            data: logo(),
          },
          {
            type: "input",
            data: description(),
            translatable: true,
          },
        ],
      },
    ],
  };
};
