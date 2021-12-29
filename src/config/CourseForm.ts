import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";

const name = (): InputInterface => ({
  id: "name",
  label: "Nombre",
  type: "text",
  value: null,
  required: true,
});

const description = (): InputInterface => ({
  id: "description",
  label: "Descripción",
  type: "text",
  value: null,
  required: true,
});

export default (isNew: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Nuevo curso" : "Editar curso",
        elements: [
          {
            type: "input",
            data: name(),
          },
          {
            type: "input",
            data: description(),
          },
        ],
      },
    ],
  };
};
