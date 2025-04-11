export interface Message {
    id: string;
    sender: string; // uid
    text: string;
    timestamp: any;
  }
  
  export interface Chat {
    matchId: string;
    messages: Message[];
  }
  