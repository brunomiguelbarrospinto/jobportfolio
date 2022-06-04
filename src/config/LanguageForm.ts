import FormInterface from "@/definitions/form/FormInterface";
import InputInterface from "@/definitions/form/InputInterface";
import SelectInterface from "@/definitions/form/SelectInterface";
import languages from "@/data/languages.json";

const language = (locale: string): SelectInterface => ({
  id: "languageId",
  label: "Language",
  value: null,
  required: true,
  options: languages.map((l) => ({ value: l.id, text: l.name[locale] })),
});

const description = (): InputInterface => ({
  id: "description",
  label: "Description",
  type: "text",
  value: null,
});

export default ({
  isNew,
  locale,
}: {
  isNew: boolean;
  locale: string;
}): FormInterface => {
  return {
    fieldsets: [
      {
        legend: isNew ? "Create" : "Edit",
        elements: [
          {
            type: "select",
            data: language(locale),
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
