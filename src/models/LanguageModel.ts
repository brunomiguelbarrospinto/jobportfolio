import LanguageInterface from "@/definitions/entities/LanguageInterface";
import languages from "@/data/languages.json";

class LanguageClass {
  id?: string;
  languageId: number;
  description?: string;
  order: number;
  name: string;

  constructor(language: LanguageInterface) {
    this.id = language.id;
    this.languageId = language.languageId;
    this.description = language.description;
    this.order = language.order;
    this.name = languages.find((l) => l.id == this.languageId)?.name
      .es as string;
  }
}

export default LanguageClass;
