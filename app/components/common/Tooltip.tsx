'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'center' | 'start' | 'end';
}

export default function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center'
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger className="cursor-default" asChild>
          <span>
            {children}
          </span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            collisionPadding={8}
            className="z-50 max-w-xs overflow-hidden rounded-md bg-primary-dark/95 backdrop-blur-sm px-3 py-2 text-xs text-neutral-light shadow-lg border border-neutral-light/10"
            style={{
              transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
              animation: 'tooltip-slide 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="font-medium tracking-wide leading-relaxed">
              {content}
            </div>
            <style jsx global>{`
              @keyframes tooltip-slide {
                from {
                  opacity: 0;
                  transform: scale(0.96);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}</style>
            <TooltipPrimitive.Arrow
              width={12}
              height={6}
              className="fill-primary-dark/95 drop-shadow-sm"
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
} 