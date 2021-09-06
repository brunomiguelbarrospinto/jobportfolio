import FormInterface from "@/definitions/form/FormInterface";
import FormElementInterface from "@/definitions/form/FormElementInterface";
import InputInterface from "@/definitions/form/InputInterface";
import CheckboxInterface from "@/definitions/form/CheckboxInterface";

const image = (): InputInterface => ({
  id: "image",
  label: "Logo",
  type: "file",
  value: null,
});

const institute = (): InputInterface => ({
  id: "institute",
  label: "Instituto",
  type: "text",
  value: null,
  required: true,
});

const title = (): InputInterface => ({
  id: "title",
  label: "Titulo",
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
  label: "Actualmente estudiando",
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

export default (isNewStudy: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNewStudy ? "Nuevo estudio" : "Editar estudio",
        elements: [
          {
            type: "input",
            data: image(),
          },
          {
            type: "input",
            data: institute(),
          },
          {
            type: "input",
            data: title(),
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
