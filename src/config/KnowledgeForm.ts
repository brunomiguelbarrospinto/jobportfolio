import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
const company = (): InputInterface => ({
  id: "name",
  label: "Knowledge",
  type: "text",
  value: null,
  required: true,
});

const url = (): InputInterface => ({
  id: "url",
  label: "Link",
  type: "text",
  value: null,
});

const color = (): InputInterface => ({
  id: "color",
  label: "Color",
  type: "color",
  value: null,
});

export default (isNew: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Create" : "Edit",
        elements: [
          {
            type: "input",
            data: company(),
            translatable: true,
          },
          {
            type: "input",
            data: url(),
          },
          {
            type: "input",
            data: color(),
          },
        ],
      },
    ],
  };
};
