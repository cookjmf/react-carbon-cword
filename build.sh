#!/bin/sh

# 1.   copy to ".env" :
# PUBLIC_URL=http://localhost:8080

echo "PUBLIC_URL=http://localhost:8080" > .env

# 2.   npm run build

npm run build

# 3.   mv build to app

rm -rf app/build
mv build app


# 4. to run server : node server-prod.js

# 5. client : browser to : http://localhost:8080
