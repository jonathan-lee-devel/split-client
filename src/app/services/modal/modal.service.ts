import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {
    return;
  }

  public showModal(title: string, text: string) {
    const modalTitle = document.getElementById('exampleModalLabel');
    if (modalTitle) {
      modalTitle.innerText = title;
    }
    const modalText = document.getElementById('modalText');
    if (modalText) {
      modalText.innerText = text;
    }

    // @ts-ignore
    const modal = new bootstrap.Modal(document.getElementById('modal'), {});
    if (modal) {
      modal.show();
    }
    const modalCloseButton = document.getElementById('modalCloseButton');
    if (modalCloseButton) {
      modalCloseButton.onclick = () => {
        modal.hide();
      };
    }
  }
}
