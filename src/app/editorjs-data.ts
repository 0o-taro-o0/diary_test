export interface EditorjsData {
  time: number;
  blocks: EditorjsDataBlock[];
  version: string;
}

export interface EditorjsDataBlock {
  id: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    style?: string;
    items?: [string];
    file?: {
      url: string;
    }
    caption?: string;
    withBorder?: boolean;
    stretched?: boolean;
    withBackground?: boolean;
  };
}
