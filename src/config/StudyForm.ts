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
  label: "Institute",
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

const title = (): InputInterface => ({
  id: "title",
  label: "Title",
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
  label: "Currently studying",
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

export default (isNewStudy: boolean): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNewStudy ? "Create" : "Edit",
        elements: [
          {
            type: "input",
            data: image(),
          },
          {
            type: "input",
            data: institute(),
            translatable: true,
          },
          {
            type: "input",
            data: url(),
          },
          {
            type: "input",
            data: title(),
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
