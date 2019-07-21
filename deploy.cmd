copy .\Beast.backend\app.js "..\Beast.MODE production" /Y
copy .\Beast.backend\Procfile "..\Beast.MODE production" /Y
copy .\Beast.backend\package.json "..\Beast.MODE production" /Y
copy .\Beast.backend\package-lock.json "..\Beast.MODE production" /Y
copy .\Beast.backend\.gitignore "..\Beast.MODE production" /Y
mkdir "..\Beast.MODE production\controllers"
mkdir "..\Beast.MODE production\models"
mkdir "..\Beast.MODE production\util"
mkdir "..\Beast.MODE production\certs"
xcopy .\Beast.backend\controllers "..\Beast.MODE production\controllers" /Y
xcopy .\Beast.backend\models "..\Beast.MODE production\models" /Y
xcopy .\Beast.backend\util "..\Beast.MODE production\util" /Y
xcopy .\Beast.backend\certs "..\Beast.MODE production\certs" /Y

cd .\Beast.mode
call npm run build
cd ..

mkdir ".\Beast.MODE production\build"
xcopy .\Beast.mode\build "..\Beast.MODE production\build" /Y

cd "..\Beast.MODE production"
call git add *
call git commit -m "Automatic rocks"
call git push -u heroku master

cd ..\Beast.mode