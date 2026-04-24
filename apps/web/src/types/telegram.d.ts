import { TelegramAuthData } from '@stardeck/shared';

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
    Telegram: {
      Login: {
        auth: (
          params: object,
          callback: (user: TelegramAuthData) => void,
        ) => void;
      };
    };
  }
}
