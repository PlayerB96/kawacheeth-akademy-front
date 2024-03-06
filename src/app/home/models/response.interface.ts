// app.model.ts

export interface HomeUpdates {
  status: true;
  data: Update[];
  message: string;
}

export interface Update {
  code: string;
  title: string;
  status: boolean;
  date: string;
  description: string;
  meta_current: number;
  meta_total: number;
}



