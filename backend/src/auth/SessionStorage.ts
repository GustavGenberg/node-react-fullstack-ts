import * as crypto from 'crypto';

export const SessionStorage = new class SessionStorage {

     private tokens: Map<string, any> = new Map();

     public create(data: any = {}) {
          const token = crypto.randomBytes(32).toString('hex');
          this.tokens.set(token, data);

          setTimeout(() => {
               this.destroy(token);
          }, 1000 * 60 * 60)

          return token;
     }

     public destroy(token: string) {
          this.tokens.delete(token);
     }

     public exists(token: string) {
          return this.tokens.has(token);
     }

     public get(token: string) {
          return this.tokens.get(token);
     }

}