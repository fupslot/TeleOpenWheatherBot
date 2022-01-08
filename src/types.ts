interface Persona {
  id: number;
  first_name: string;
  lastname: string;
  username: string;
}

export interface Message {
  message_id: string;
  from: Persona;
  chat: Persona;
  date: number;
  text: string;
}
