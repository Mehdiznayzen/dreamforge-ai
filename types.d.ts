export interface ConfirmSignOutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export interface CustomInputOTPProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  onResend : () => Promise<void>;
}

export interface CustomModalInputProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

export interface CustomNewPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => Promise<void>;
}

export interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: "purple" | "blue" | "pink" | "cyan";
}

export interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  liked?: boolean;
}

export interface UserProps {
    clerkId: string,
    username: string,
    email: string,
    password: string
}