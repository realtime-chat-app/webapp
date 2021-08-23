import { Injectable } from "@angular/core";

import { AuthService } from "@core/services";

import { Message } from "@core/models";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private authService: AuthService) { }

  fakeMessages(): Message[] {
    const user = this.authService.currentUserValue;
    return [
      new Message({
        createdAt: new Date(),
        files: [],
        user,
        reply: false,
        latitude: 1239,
        longitude: 12937,
        quote: 'quote aqui',
        type: 'text',
        text: 'Arroz é bão demais',
      }),
    ];
  }
}