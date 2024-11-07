import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/utils/tailwind/cn';
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

type DrawerDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  closeButton?: React.ReactNode;
  dialogClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export function DrawerDialog({
  open,
  setOpen,
  trigger,
  title,
  description,
  children,
  closeButton,
  dialogClassName,
}: DrawerDialogProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          className={cn(
            'mx-auto h-full max-h-[90vh] w-full',
            'overflow-y-scroll',
            'max-w-[48rem]',
            dialogClassName
          )}
        >
          <DialogHeader
            className={cn({
              hidden: !title && !description,
            })}
          >
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
        )}
        {children}
        <DrawerFooter className="pt-2">
          {closeButton && <DrawerClose asChild>{closeButton}</DrawerClose>}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
