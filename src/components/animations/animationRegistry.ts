import { AnimationType } from "./animationTypes";

export const animationRegistry: Record<AnimationType, string> = {
  [AnimationType.Loader]: "/animations/loader.json",
  [AnimationType.Success]: "/animations/success.json",
  [AnimationType.Error]: "/animations/error.json",
  [AnimationType.Empty]: "/animations/empty.json",
  [AnimationType.Auth]: "/animations/auth.json",
};
