import * as React from "react";
import { Dialog as RadixDialog } from "@radix-ui/react-dialog";

export const Dialog: React.FC<{ open: boolean; onOpenChange: () => void; children: React.ReactNode }> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <RadixDialog open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog>
  );
};

export const DialogContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  return <div className={`bg-white p-4 rounded-lg shadow-lg ${className}`}>{children}</div>;
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};
