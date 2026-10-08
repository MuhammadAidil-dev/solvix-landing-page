export class ApiError extends Error {
  status: number;
  code: string;
  details: unknown;
  raw: unknown;

  constructor(opts: {
    status: number;
    code: string;
    message: string;
    details?: unknown;
    raw?: unknown;
  }) {
    super(opts.message);
    this.name = "ApiError";
    this.status = opts.status;
    this.code = opts.code;
    this.details = opts.details;
    this.raw = opts.raw;
  }
}
