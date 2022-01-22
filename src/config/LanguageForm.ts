import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import SelectInterface from "@/definitions/form/SelectInterface";
import languages from "@/data/languages.json";

const language = (): SelectInterface => ({
  id: "languageId",
  label: "Idioma",
  value: null,
  required: true,
  options: languages.map((l) => ({ value: l.id, text: l.name.es })),
});

const description = (): InputInterface => ({
  id: "description",
  label: "Descripción",
  type: "text",
  value: null,
});

export default (isNew: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Nuevo idioma" : "Editar idioma",
        elements: [
          {
            type: "select",
            data: language(),
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
