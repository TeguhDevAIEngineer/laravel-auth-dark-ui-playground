export interface CardSettings {
  bgBase: 'slate' | 'zinc' | 'stone' | 'neutral';
  glowColor: 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';
  accentColor: 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';
  glowIntensity: number; // 0 to 10
  blurAmount: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showGrid: boolean;
  cardOpacity: number; // 50 to 100
  borderContrast: 'low' | 'medium' | 'high';
  roundedCorner: 'none' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export interface LaravelCodeSnippet {
  id: string;
  filename: string;
  language: 'php' | 'html';
  code: string;
  description: string;
  steps: {
    lineStart: number;
    lineEnd: number;
    title: string;
    explanation: string;
  }[];
}
