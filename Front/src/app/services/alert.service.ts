import { Injectable } from '@angular/core'
import AWN from 'awesome-notifications'

let onOk = () => {notifier.info('Action Confirmed')};
let onCancel = () => {notifier.info('You pressed Cancel')};

// Set global options
const globalOptions = {
  position: 'bottom-right',
  duration: 2000,
}

// Initialize instance of AWN
const notifier = new AWN()

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  successToast(msg:any) {
    notifier.success(msg)
  }
  errorToast(msg:any) {
    notifier.alert(msg)
  }
  warningToast(msg:any) {
    notifier.warning(msg)
  }
  infoToast(msg:any) {
    notifier.info(msg )
  }
  tipToast(msg:any) {
    notifier.tip(msg)
  }
  asyncToast(msg:any) {
    notifier.async(msg)
  }
  asyncBlock(msg:any) {
    notifier.asyncBlock(msg)
  }
  modal(msg:any) {
    notifier.modal(msg)
  }
  confirm(msg : any, ok:any) {
    return notifier.confirm(msg, ok = onOk, onCancel)
  }
}
