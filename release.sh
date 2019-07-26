## 简单的自动化发版脚本

# 发版文件 构建目录
releaseRootDir=/home/leidenglai/release
# 客户端文件 静态目录
clientDir=/usr/local/nginx/html/cra-ssr-ts
# node服务目录
serverDir=/home/leidenglai/node/cra-ssr-ts

cd $releaseRootDir/cra-ssr-ts
git clone https://github.com/leidenglai/cra-ssr-ts.git

# client
yarn install && yarn build
tar -zcvf client.tar.gz --exclude=build/.git build
mv ./client.tar.gz $clientDir -b -f
tar -zxvf $clientDir/client.tar.gz

# server
cd $releaseRootDir/cra-ssr-ts/server
yarn install && yarn build
tar -zcvf server.tar.gz --exclude=build/.git build
mv ./server.tar.gz $serverDir -b -f
tar -zxvf $serverDir/server.tar.gz
mv ./build/package.json ./package.json -b -f
yarn install --production
#pm2 start pm2.json
pm2 restart cra-ssr-ts
