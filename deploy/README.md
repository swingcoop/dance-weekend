How to deploy:

If it's just a client change:

push code to github
ssh swing
cd /usr/local/src/dance-weekend
git pull
cd www
npm run build
cd /usr/local/lsws/Example/html/node
cp -r /usr/local/src/dance-weekend/www/dist .

