npm run build
cd ../hatoweb-test && rm -rf ./css ./favicon.ico ./img ./index.html ./js && mv ../hatoweb2021/dist/* ./ && git add . && git commit -m "deploy" && git push
