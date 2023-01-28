import * as IronSession from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      login: boolean;
    };
  }
}

interface diaryType {
  description: string;
  id: number;
  point: string;
  title: string;
}
