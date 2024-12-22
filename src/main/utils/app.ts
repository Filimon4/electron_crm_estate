import { BrowserWindow, ipcMain } from "electron";
import { Client } from "../db/entities";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

var mainWindow: BrowserWindow

export function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1440,
    minHeight: 650,
    minWidth: 850,
    autoHideMenuBar: true,
    center: true,
    title: 'Estate Crm',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.removeMenu()
  mainWindow.setMenuBarVisibility(false)
  mainWindow.webContents.openDevTools();
};

export function goFront(emit: string, ...args: any) {
  mainWindow.webContents.send(emit, ...args)
}

export function sendNotify(type: 'error' | 'info' | 'success', msg: string) {
  goFront('onNotify', type, msg)
}
