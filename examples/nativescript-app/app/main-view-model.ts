import { Observable } from '@nativescript/core'
import { UrlHandlerService } from './services/url-handler.service'


export class HelloWorldModel extends Observable {
  private _message: string
  

  constructor() {
    super();
    this.listenToUrlChange();
  }

  listenToUrlChange(): void {
    UrlHandlerService.getInstance().handleOpenURL((storybook) => {
      console.log('url changed', storybook);
      this.message = storybook.params.label
    })
  }

  get message(): string {
    return this._message
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value
      this.notifyPropertyChange('message', value)
    }
  }
}
