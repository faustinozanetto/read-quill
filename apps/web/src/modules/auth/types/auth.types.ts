import { BuiltInProviderType } from 'next-auth/providers/index';

export type AuthSignInOption = {
  label: string;
  provider: BuiltInProviderType;
  icon: JSX.Element;
};
