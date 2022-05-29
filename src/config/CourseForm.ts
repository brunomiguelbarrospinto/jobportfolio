import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";

const name = (): InputInterface => ({
  id: "name",
  label: "Name",
  type: "text",
  value: null,
  required: true,
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
        legend: isNew ? "Create" : "Edit",
        elements: [
          {
            type: "input",
            data: name(),
            translatable: true,
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
