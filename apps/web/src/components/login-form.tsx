'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/glass/button';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';

import Script from 'next/script';

type LoginFormProps = {
  onLogin: () => void;
  className?: string;
};

export function LoginForm({ onLogin, className }: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <form id="login-form">
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-10 items-center justify-center rounded-md text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M3.545 1.81A12.428 12.428 0 0 0 0 2.35a10.409 10.409 0 0 1 1.838-.146c5.602.048 10.114 4.543 10.16 10.075-2.263 1.066-4.976 2.147-7.986 3.158-1.258.423-2.956 1.053-3.751 1.482a2.073 2.073 0 0 1-.04.035l.257-.065c1.338-.338 2.714-.703 4.112-1.116a106.969 106.969 0 0 0 7.364-2.455c-.404 4.299-3.506 7.81-7.599 8.872 5.472-.627 9.837-4.8 10.155-9.883 6.236-2.597 9.957-5.18 9.443-6.805-.454-1.435-5.038-1.7-11.657-.554.229.226.492.512.757.826 3.3-.31 5.532-.007 5.83.934.335 1.06-1.348 2.612-4.382 4.296-.395-5.198-5.1-9.236-10.956-9.194z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="sr-only">StarDeck.</span>
            </a>
            <h1
              className="text-xl font-bold text-white"
              style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
            >
              Добро пожаловать в StarDeck.
            </h1>
          </div>
          <Field className="align-middle">
            <Button
              className="text-white rounded-full"
              glass={{ color: 'rgba(255, 255, 255, 0.1)', blur: 20 }}
              onClick={onLogin}
              type="button"
              form="login-form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                  fill="currentColor"
                />
              </svg>
              Продолжить с Telegram
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription
        className="px-6 text-center text-white"
        style={{ textShadow: '0 0 20px rgba(0,0,0,0.8)' }}
      >
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>

      <Script src="https://telegram.org/js/telegram-widget.js?23" async />
    </div>
  );
}
