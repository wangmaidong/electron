# electron
第一次作业

1.-webkit-app-region: drag
这个属性通常被用于基于 Web 技术开发的跨平台桌面应用程序，比如使用 Electron 等框架开发的应用程序。在这些应用程序中，开发者可以通过使用 -webkit-app-region: drag; 这个属性来定义一个可拖动区域，从而让用户可以通过鼠标拖拽界面元素来移动整个应用程序窗口。

具体来说，开发者可以将这个属性应用到某个元素上，比如标题栏或工具栏，然后当用户在这个区域内进行鼠标拖拽操作时，应用程序就会响应该事件，并通过调整窗口位置和大小来实现拖拽窗口的效果。

2.查阅官方文档，在主进程 main/index.js 里面添加代码，能够在窗口启动之后打开调试控制台。
可以通过调用该api  win.webContents.openDevTools()  官方文档具体地址：https://www.electronjs.org/zh/docs/latest/tutorial/application-debugging