cd ..
rm .\dist\
npx ng run JudimaApp:judima:pseudoprod
cd .\dist\psuedo\
python -m http.server
