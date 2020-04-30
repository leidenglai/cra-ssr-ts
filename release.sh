## 简单的自动化发版脚本

# 发版文件 构建目录
releaseRootDir=/usr/local/project/release

# 客户端文件 静态目录
clientDir=/usr/local/nginx/html/cra-ssr-ts
# node服务目录
serverDir=/usr/local/project/nodejs/cra-ssr-ts

cd $releaseRootDir/cra-ssr-ts
git clone https://github.com/leidenglai/cra-ssr-ts.git

# client 构建
yarn install && yarn build
tar -zcvf client.tar.gz  build
# 发布静态文件
mv ./client.tar.gz $clientDir -b -f
tar -zxvf $clientDir/client.tar.gz

# server 构建
cd $releaseRootDir/cra-ssr-ts/server
yarn install && yarn build
tar -zcvf server.tar.gz build
# 发布node 服务
mv ./server.tar.gz $serverDir -b -f
tar -zxvf $serverDir/server.tar.gz
cd $serverDir
mv ./build/package.json ./package.json -b -f
yarn install --production
#pm2 start config/pm2.json
pm2 restart config/pm2.json
