export interface PunchcodeImage {
  id: string;
  ref: string;
  name: string;
  title: string;
  description: string;
  properties?:
    | {
        width: number;
        height: number;
        resolution: number;
        fileSize: number;
      }
    | {};
}
