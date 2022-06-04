import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import TextareaInterface from "@/definitions/form/TextareaInterface";

const name: InputInterface = {
  id: "name",
  label: "Name",
  type: "text",
  value: null,
  required: true,
};

const email: InputInterface = {
  id: "email",
  label: "Email",
  type: "text",
  value: null,
  required: true,
};
const title: InputInterface = {
  id: "title",
  label: "Title",
  type: "text",
  value: null,
  required: true,
};

const message: TextareaInterface = {
  id: "message",
  label: "Message",
  value: null,
  rows: 6,
  required: true,
};

export default (): FormInterface => {
  return {
    fieldsets: [
      {
        legend: "Contact form",
        elements: [
          {
            type: "input",
            data: name,
          },
          {
            type: "input",
            data: email,
          },
          {
            type: "input",
            data: title,
          },
          {
            type: "textarea",
            data: message,
          },
        ],
      },
    ],
    buttonText: "Send",
  };
};
