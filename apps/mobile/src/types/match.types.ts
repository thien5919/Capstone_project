export interface Match {
    id: string;
    users: [string, string]; // uid1 and uid2
    createdAt: any;
    lastMessage?: string;
    lastMessageTime?: any;
  }
  
  export interface Swipe {
    from: string; // uid
    to: string;   // uid
    action: 'right' | 'left';
    timestamp: any;
  }
  