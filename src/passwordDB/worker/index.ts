import { v4 } from 'uuid';

import { IPasswordDB } from '../common';

interface Message {
  id: string;
  type: string;
  payload: any;
}

interface MessagePromise extends Message {
  resolve: (resp: any) => any;
  reject: (err: any) => any;
}

export class WorkerPasswordDB implements Partial<IPasswordDB> {
  private worker: Worker;
  private messages: MessagePromise[];

  constructor() {
    this.messages = [];
    this.worker = new ((require as any)('./passwordDB.worker.js'))();

    this.worker.onmessage = (message) => {
      const data: Message = JSON.parse(message.data);
      this.handleMessage(data);
    };
  }

  handleMessage(message: Message) {
    const matching = this.messages.find((m) => m.id === message.id);

    if (matching) {
      this.messages = this.messages.filter((m) => m !== matching);

      matching.resolve(message.payload);
    } else {
      console.error('WorkerPasswordDB worker sent unknown message', message);
    }
  }

  send<TPayload, TResponse>(type: string, payload: TPayload): Promise<TResponse> {
    return new Promise((resolve, reject) => {
      const message: MessagePromise = {
        id: v4(),
        type,
        payload,
        resolve,
        reject,
      };

      this.messages.push(message);
      this.worker.postMessage(JSON.stringify(message));
    });
  }

  login(username: string, password: string) {
    return this.send<any, { success: boolean }>('login', { username, password }).then((x) => x.success);
  }
}
