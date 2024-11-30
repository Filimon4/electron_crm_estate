//@ts-nocheck

import { notifyConfig } from "./notifies.config"

window.context.onNotify((args) => {
  console.log(args, notifyConfig['error'])
  if (!notifyConfig[`${args[0]}`]) {
    console.warn("Такой нотификации нету")
    return
  }
  notifyConfig[args[0]](args[1])
})
  