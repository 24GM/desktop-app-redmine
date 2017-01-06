'use strict';

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メニューバーの宣言
// var remote = require('remote');
var remote = electron.remote;
var Tray = electron.Tray;
var Menu = electron.Menu;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

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

var appIcon = null
var appIcon = new Tray( __dirname + '/images/redmine_icon_color_24.png');
  // コンテキストメニュー追加
  const contextMenu = Menu.buildFromTemplate([
     {label: 'settings'},
     {label: 'readme'},
     {label: "終了", click: function () { mainWindow.close(); } }
  ]);
  appIcon.setContextMenu(contextMenu);
  // アイコンにマウスオーバーした時の説明
  appIcon.setToolTip('desktop-app-redmine.');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
