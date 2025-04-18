export type SignUpStackParamList = {
    CreateAccount: undefined;
    ProfileInfo: undefined;
    MatchPreference: undefined;
  
  };
  
  export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
  };
  
  export type AppStackParamList = {
    Match: undefined;
    Features: undefined;
    Notifications: undefined;
    Chats: undefined;
    Profile: undefined;
  };
  
  export type ChatStackParamList = {
    ChatList: undefined;
    ChatRoom: { chatId: string };
    Chat: { otherUser: { uid: string; displayName: string } }; // ✅ add this
  };
  