import { EventEmitter } from 'events';
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import path from 'path';

interface BaseWindowBaseOptions {
  url: string;
}
interface BaseWindowConstructorOptions {
  windowId: string;
  baseOptions: BaseWindowBaseOptions;
  windowOptions: BrowserWindowConstructorOptions;
}

/**
 * 基础窗口
 */
export class BaseWindow extends EventEmitter {
  private static windowIdMappingWebContentId: Map<string, number> = new Map();

  // BrowserWindow 对象
  private browserWindow!: BrowserWindow;

  // 窗口id
  private windowId!: string;

  // 构造
  constructor(options: BaseWindowConstructorOptions) {
    super();
    this.windowId = options.windowId;
    // 创建窗口
    this.createBrowserWindow(options.baseOptions, options.windowOptions);
  }

  // 创建窗口
  private createBrowserWindow(
    baseOptions: BaseWindowBaseOptions,
    windowOptions: BrowserWindowConstructorOptions
  ) {
    this.emit('beforeCreated');
    this.browserWindow = new BrowserWindow({
      ...(windowOptions || {}),
      webPreferences: {
        preload: path.join(__dirname, '/preload.js'),
        ...(windowOptions?.webPreferences || {})
      }
    });
    this.browserWindow.loadURL(baseOptions.url);
    this.onReadyShow();
  }

  /**
   * 传值回渲染进程
   */
  private onReadyShow() {
    // windowId和WebContentId建立关系
    BaseWindow.windowIdMappingWebContentId.set(
      this.windowId,
      this.browserWindow.webContents.id
    );
    // 发送消息给界面
    this.browserWindow.on('ready-to-show', (...args: any[]) => {
      this.emit('ready-to-show', ...args);
      this.browserWindow.webContents.send('window-webcontent-created', {
        windowId: this.windowId,
        webContentsId: this.browserWindow.webContents.id
      });
    });
    // 关闭窗口解除绑定
    this.browserWindow.on('closed', (...args: any[]) => {
      this.emit('ready-to-show', ...args);
      BaseWindow.windowIdMappingWebContentId.delete(this.windowId);
    });
  }
}
