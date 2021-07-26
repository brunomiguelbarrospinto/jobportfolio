import BaseElementInterface from "./BaseElementInterface";
import OptionInterface from "./OptionInterface";

export default interface SelectInterface extends BaseElementInterface {
  options: OptionInterface[];
}
