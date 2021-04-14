export interface NutGame {
  id: string;
  name: string;
  size: number;
  version: number;
}

export interface NutFiles {
  titleId: [
    titleType: [
      {
        titleId: string;
        hasValidTicket: boolean;
        extractedNcaMeta: number;
        version: string;
        timestamp: number;
        path: string;
        fileSize: number;
      }
    ]
  ];
}

export interface NutTitle {
  id: string;
  rightsId: string;
  name: string;
  version: string;
  key: string;
  isDemo: boolean;
  region: string;
  regions: string[];
  releaseDate: number;
  nsuId: number;
  category: string[];
  ratingContent: string[];
  numberOfPlayers: number;
  rating: number;
  developer: string;
  publisher: string;
  frontBoxArt: string;
  iconUrl: string;
  screenshots: string[];
  bannerUrl: string;
  intro: string;
  description: string;
  languages: string[];
  size: number;
  rank: 4;
  language: string;
  isUpdate: boolean;
  baseId: string;
  isDLC: boolean;
  idExt: number;
  updateId?: string;
  mtime?: number;
}

export interface NutDialogData {
  title: NutTitle;
  myDLCs: NutTitle[];
  myUpdates: NutTitle[];
  remoteDLCs: NutTitle[];
  remoteUpdates: NutTitle[];
}
