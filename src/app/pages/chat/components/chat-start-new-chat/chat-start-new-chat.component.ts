import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NbMenuService, NbWindowRef, NbWindowService } from '@nebular/theme';

import { filter, map, startWith, take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AuthService, UserService } from '@core/services';
import { ChatService } from '@pages/chat/chat.service';

import { Chat, User } from '@core/models';

@Component({
  selector: 'chat-start-new-chat',
  templateUrl: './chat-start-new-chat.component.html',
  styleUrls: ['./chat-start-new-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatStartNewChatComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @Input() chats: Chat[] = [];

  private unsubscribe$ = new Subject();
  private modalRef!: NbWindowRef;
  public users$ = new BehaviorSubject<User[]>([]);
  public form: FormGroup | null = null;
  public isGroup = false;
  public menuItems = [
    { id: 1, title: 'Nova Conversa' },
    { id: 2, title: 'Novo Grupo' },
  ];
  public menuTag = 'open-new-chat';

  constructor(
    private windowService: NbWindowService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private userService: UserService,
    private service: ChatService,
  ) { }

  ngOnInit() {
    this.menuClickEvents();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public openMembersModal(): void {
    this.modalRef = this.windowService.open(this.modalContent, {
      hasBackdrop: true,
      title: 'Nova Conversa',
      windowClass: 'start-new-chat-modal',
    });
  }

  public startChat(user?: User): void {
    let chat;
    if (user) {
      chat = new Chat({
        userId: this.authService.currentUserValue.id,
        isGroup: false,
        members: [user?.id],
      });
    } else {
      const ids = [];
      for (const id in this.form?.value) {
        if (Object.prototype.hasOwnProperty.call(this.form?.value, id)) {
          const isASelectedMember = this.form?.value[id];
          if (isASelectedMember) {
            ids.push(id);
          }
        }
      }
      chat = new Chat({
        userId: this.authService.currentUserValue.id,
        isGroup: false,
        members: ids,
      });
    }

    this.service.emit(`chat:start-chat`, chat);
    this.form?.reset();
    this.modalRef?.close();
  }

  public disableFormSubmissionBtn$(): Observable<boolean> {
    return (this.form as FormGroup).valueChanges
      .pipe(
        startWith((this.form as FormGroup).value),
        map((value: any) => {
          if (this.form?.pristine) return true;

          let shouldDisableBtn = true;
          for (const id in value) {
            if (Object.prototype.hasOwnProperty.call(value, id)) {
              const memberIsSelected = value[id];
              if (typeof memberIsSelected === 'boolean' && memberIsSelected) shouldDisableBtn = false;
            }
          }
          return shouldDisableBtn;
        }),
      );
  }

  private menuClickEvents(): void {
    this.menuService.onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(menu => menu.tag === this.menuTag)
      )
      .subscribe(menu => {
        this.getUsers();
        switch (menu.item.title.toLowerCase()) {
          case 'nova conversa':
            this.isGroup = false;
            break;

          case 'novo grupo':
            this.isGroup = true;
            break;

          default:
            this.isGroup = false;
            break;
        }
        this.openMembersModal();
      });
  }

  private getUsers(): void {
    this.userService.GetUsers({ removeSelf: true })
      .pipe(
        // TODO: add error validation
        take(1),
        tap((users => this.form = new FormGroup({
          ...this.createNamedFormControls(users, 'id'),
        }))),
      )
      .subscribe(users => this.users$.next(users));
  }

  private createNamedFormControls(payload: any[], payloadAttributeToUseAsControlName: string): {
    [x: string]: FormControl;
  } {
    return [...payload].map(currItem => {
      let currControl = new FormControl(false, { validators: [Validators.required] });
      return { [`${currItem[payloadAttributeToUseAsControlName]}`]: currControl };
    })
      .reduce((acc, curr) => {
        return { ...acc, ...curr };
      },
        {}
      );
  }
}
