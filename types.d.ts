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

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  liked: boolean;
}

export interface ImageGalleryProps {
  images: GeneratedImage[];
  onLike: (id: string) => void;
  onDownload: (id: string) => void;
  onCopyPrompt: (prompt: string) => void;
}

export interface PromptInputProps {
  onGenerate: (prompt: string, settings: GenerationSettings) => void;
  isGenerating: boolean;
}

export interface GenerationSettings {
  model: string;
  style: string;
  aspectRatio: string;
}

export interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  liked: boolean;
}

export interface ImageProps {
  url: string,
  prompt: string,
  userId: string
}