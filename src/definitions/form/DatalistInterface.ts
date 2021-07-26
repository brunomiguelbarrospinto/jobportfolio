import BaseElementInterface from "./BaseElementInterface";
import OptionInterface from "./OptionInterface";

export default interface DatalistInterface extends BaseElementInterface {
  options: OptionInterface[];
}
