copy .\Beast.backend\app.js "..\Beast.MODE production" /Y
copy .\Beast.backend\Procfile "..\Beast.MODE production" /Y
copy .\Beast.backend\package.json "..\Beast.MODE production" /Y
copy .\Beast.backend\package-lock.json "..\Beast.MODE production" /Y
copy .\Beast.backend\.gitignore "..\Beast.MODE production" /Y
xcopy .\Beast.backend\controllers "..\Beast.MODE production" /Y
xcopy .\Beast.backend\models "..\Beast.MODE production" /Y
xcopy .\Beast.backend\util "..\Beast.MODE production" /Y

cd .\Beast.mode
call npm run build
cd ..

xcopy .\Beast.mode\build "..\Beast.MODE production" /Y

cd "..\Beast.MODE production"
call git add *
call git commit -m "Automatic rocks"
call git push -u heroku master

cd ..\Beast.mode