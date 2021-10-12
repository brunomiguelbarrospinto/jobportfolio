import FormElementInterface from "./FormElementInterface";

export default interface FieldsetInterface {
  sortable?: boolean;
  legend: string;
  elements: FormElementInterface[];
}
