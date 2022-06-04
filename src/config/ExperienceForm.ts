import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import FormElementInterface from "@/definitions/form/FormElementInterface";
import CheckboxInterface from "@/definitions/form/CheckboxInterface";
const company = (): InputInterface => ({
  id: "company",
  label: "Company",
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

const brandColor = (): InputInterface => ({
  id: "brandColor",
  label: "Brand color",
  type: "color",
  value: null,
});

const position = (): InputInterface => ({
  id: "position",
  label: "Position",
  type: "text",
  value: null,
  required: true,
});

const location = (): InputInterface => ({
  id: "location",
  label: "Location",
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

const startDate = (): InputInterface => ({
  id: "startDate",
  label: "Start date",
  type: "date",
  value: null,
  required: true,
});

const current = (): CheckboxInterface => ({
  id: "current",
  label: "Currently working",
  type: "checkbox",
  value: false,
});

const finishDate = (): InputInterface => ({
  id: "finishDate",
  label: "Finish date",
  type: "date",
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
            data: brandColor(),
          },
          {
            type: "input",
            data: position(),
            translatable: true,
          },
          {
            type: "input",
            data: location(),
            translatable: true,
          },
          {
            type: "input",
            data: description(),
            translatable: true,
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
