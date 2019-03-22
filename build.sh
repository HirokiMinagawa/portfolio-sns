cp server/config.js.template server/config.js.template
cp src/config/config.js.template src/config/config.js

npm run build-client

mv dist server/public