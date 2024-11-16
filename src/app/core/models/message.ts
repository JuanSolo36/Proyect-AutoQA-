import { MessageService } from "primeng/api";

export enum TypeMessage {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
}
export const showMessage = (typeMessage: TypeMessage, title: string, content: string, messageService: MessageService) => {
  messageService.add({
    severity: typeMessage,
    summary: title,
    detail: content,
  });
}
