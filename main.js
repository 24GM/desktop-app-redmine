'use strict';

const electron = require("electron"); // Electronのモジュール
const app = electron.app;   // アプリケーションをコントロールするモジュール
const BrowserWindow = electron.BrowserWindow;   // ウィンドウを作成するモジュール
let mainWindow;   // メインウィンドウはGCされないようにグローバル宣言

// メニューバーの宣言
var remote = electron.remote;
var Tray = electron.Tray;
var Menu = electron.Menu;
let settingWindow;    //setting windows を定義

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
mainWindow = new BrowserWindow({width: 1000, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

// タスクトレイにアイコンと表示
var appIcon = new Tray( __dirname + '/images/redmine_icon_color_24.png');

  // コンテキストメニュー追加
  const contextMenu = Menu.buildFromTemplate([
     {label: 'settings', click: function(){
      settingWindow = new BrowserWindow({width: 1000, height: 600});
          settingWindow.loadURL('file://' + __dirname + '/setting.html');
      }},
     {label: "exit", click: function () { mainWindow.close(); } }
  ]);
  appIcon.setContextMenu(contextMenu);
    appIcon.setToolTip('desktop-app-redmine.');   // アイコンにマウスオーバーした時の説明

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
