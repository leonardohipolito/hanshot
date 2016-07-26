### Notes from docs:

- [app.makeSingleInstance(callback)](http://electron.atom.io/docs/v0.36.8/api/app/#appmakesingleinstancecallback)

### OS specific:

##### Linux:

- [Tray in Ubuntu 14.04 and 14.10](http://www.webupd8.org/2013/05/how-to-get-systray-whitelist-back-in.html)
- [Tray in Ubuntu - Gnome](http://askubuntu.com/questions/121426/no-banshee-notification-area-icon-in-gnome-3-classic-session)


### Development

There are two Webpack configurations for application's main and renderer processes.

Main process contains Electron + Node.JS code and there is only one entry point for it, which is `src/main.js`. When built, it goes to `dist/main.dist.js` and this built version is used when starting the application.

Renderer process contains Electron + React code. There are several windows in the app, each of these windows gets it's own built bundle (see `dist/`). Hot reload is available only for renderer process.

##### Development terminal commands

- Build only main process (Electron + Node.JS code) [single run]

    ```bash
    $ npm run build:main
    ```

- Build all renderer processes (Electron + React code for all windows) [single run]

    ```bash
    $ npm run build:renderer
    ```

-  Build both main and all renderer processes [single run]

    ```bash
    $ npm run build
    ```

- Start application using built bundles (kinda like in prod) [app attached to terminal]

    ```bash
    $ npm start
    ```

- Start hot reload server, which will re-bundle renderer process builds (Electron + React code for all windows) [watcher attached to terminal]

    ```bash
    $ npm start hot-server
    ```

- Start application using built bundles in hot reload mode, requires *hot-server* above [app attached to terminal]

    ```bash
    $ npm run start-hot
    ```


### Build

For now packaging is configured only for linux x64.

```bash
$ npm run package
```

After that you can find a directory `hanshot-linux-x64` in app folder, there is an app binary inside called `hanshot`.
