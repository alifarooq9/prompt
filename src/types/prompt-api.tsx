export type Body = { topic: string } & (
    | {
          mode: "normal";
      }
    | {
          mode: "beast";
          role: string;
          objective: string;
          audience: string;
          format: string;
          conciseness: string;
          context: string;
          additionalInfo: string;
      }
);
