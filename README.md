## Notes

To append custom service worker code:

1. Eject the React app with `npm run eject`.
2. Open `config/webpack.config.prod.js`
3. Find the line that conatins `SWPrecacheWebpackPlugin`.
4. In that function, add `importScripts: [{ filename: 'sw-custom.js' }],` under `filename: 'service-worker.js',`
5. Create `sw-custom.js` inside the `public` folder.
6. Run `npm run build`.
7. Run `serve -s build`.
8. Open the app in incognito.
