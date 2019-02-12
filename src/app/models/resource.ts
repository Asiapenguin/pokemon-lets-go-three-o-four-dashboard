export abstract class Resource {
  static resourcePath = "";
  abstract id: number | string;

  // isValid(): boolean {
  //   if (this.id) {
  //     return true;
  //   }
  //   return false;
  // }
}
