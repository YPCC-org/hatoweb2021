npm run build
if [ $? -eq 0 ]; then
currentDir=`pwd`
cd $1
rm -rf *
mv $currentDir/dist/* ./
git add -A
git commit -m 'deploy'
git push
fi
