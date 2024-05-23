export type FileUploadResult =
  | {
      data: {
        path: string;
      };
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export type FileDeleteResult =
  | {
      data: unknown[];
      error: null;
    }
  | {
      data: null;
      error: Error;
    };
