import { BrowserWindow } from "electron";
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

var mainWindow: BrowserWindow

export function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1440,
    minHeight: 600,
    minWidth: 800,
    autoHideMenuBar: true,
    center: true,
    title: 'Estate Crm',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: true,
      contextIsolation: true
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  mainWindow.webContents.openDevTools();

};

export function goFront(emit: string, ...args: any) {
  console.log("toFront: ", emit, args)
  mainWindow.webContents.send(emit, ...args)
} 
