export interface QuizQuestion {
  id: number;
  type: 'single' | 'boolean' | 'scenario';
  title: string;
  question: string;
  options?: { value: string; label: string }[];
  correctAnswer: string; // 'B', 'C', '否', '是', or 'A' (assuming Choice A for scenario)
  explanation: string;
  hint?: string;
}

export interface UserQuizProgress {
  answers: { [key: number]: string };
  submitted: { [key: number]: boolean };
  isCompleted: boolean;
}

export interface NoteItem {
  id: string;
  sectionId: string;
  text: string;
  timestamp: string;
}

export interface TaxBand {
  min: number;
  max: number;
  rate: number;
  deduction: number;
}
