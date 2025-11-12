export interface IProcessedFileParams {
  fileText: string;
  fileName: string;
  errors: string[];
}

export type ProcessedFSNode = IProcessedDirParams | IProcessedFileParams;

export interface IProcessedDirParams {
  [key: string]: ProcessedFSNode;
}
