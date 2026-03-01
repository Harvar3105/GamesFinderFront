export enum AnimationType {
  Loader = "loader",
  Success = "success",
  Error = "error",
  Empty = "empty",
  Auth = "auth",
}

export interface AnimationOptions {
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}
