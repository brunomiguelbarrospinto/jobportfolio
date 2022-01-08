import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import FormElementInterface from "@/definitions/form/FormElementInterface";
import CheckboxInterface from "@/definitions/form/CheckboxInterface";
const company = (): InputInterface => ({
  id: "company",
  label: "Compañia",
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

const position = (): InputInterface => ({
  id: "position",
  label: "Posición",
  type: "text",
  value: null,
  required: true,
});

const location = (): InputInterface => ({
  id: "location",
  label: "Ubicación",
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

const startDate = (): InputInterface => ({
  id: "startDate",
  label: "Fecha de inicio",
  type: "date",
  value: null,
  required: true,
});

const current = (): CheckboxInterface => ({
  id: "current",
  label: "Actualmente trabajando",
  type: "checkbox",
  value: false,
});

const finishDate = (): InputInterface => ({
  id: "finishDate",
  label: "Fecha de finalizacion",
  type: "date",
  value: null,
  required: true,
});

export default (isNew: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Nueva experiencia" : "Editar experiencia",
        elements: [
          {
            type: "input",
            data: company(),
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
            data: position(),
          },
          {
            type: "input",
            data: location(),
          },
          {
            type: "input",
            data: description(),
          },
          {
            type: "input",
            data: startDate(),
          },
          {
            type: "input",
            data: current(),
          },
          {
            type: "input",
            data: finishDate(),
            isVisible: (formElements: FormElementInterface[]) => {
              return (
                formElements.find((element) => element.data.id === "current")
                  ?.data.value === false
              );
            },
          },
        ],
      },
    ],
  };
};
