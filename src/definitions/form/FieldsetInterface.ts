import FormElementInterface from "./FormElementInterface";

export default interface FieldsetInterface {
  legend: string;
  elements: FormElementInterface[];
}
