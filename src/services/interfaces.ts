export interface BaseRequest {
  metadata: string;
  sourceversion: number;
  targetversion: number;
  dryrun: boolean;
  fileprefix: string;
  path: string;
}
