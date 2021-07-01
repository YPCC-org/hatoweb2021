npm run build
currentDir=`pwd`
cd $1
rm -rf *
mv $currentDir/dist/* ./
git add -A
git commit -m 'deploy'
git push
