import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import CheckboxInterface from "@/definitions/form/CheckboxInterface";

const showPhoto: CheckboxInterface = {
  id: "showPhoto",
  label: "Show profile picture",
  type: "checkbox",
  value: false,
};

const title: InputInterface = {
  id: "title",
  label: "Title",
  type: "text",
  value: null,
  required: true,
};

const subTitle: InputInterface = {
  id: "subTitle",
  name: "subTitle",
  label: "Subtitle",
  type: "text",
  value: null,
  required: true,
};

const backgroundImage: InputInterface = {
  id: "backgroundImage",
  label: "Background image",
  type: "file",
  value: null,
};

const social: CheckboxInterface = {
  id: "social",
  label: "Show social media",
  type: "checkbox",
  value: false,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "Setting",
        elements: [
          {
            type: "input",
            data: backgroundImage,
          },
          {
            type: "input",
            data: showPhoto,
          },
          {
            type: "input",
            data: title,
            translatable: true,
          },
          {
            type: "input",
            data: subTitle,
            translatable: true,
          },
          {
            type: "input",
            data: social,
          },
        ],
      },
    ],
  };
};
