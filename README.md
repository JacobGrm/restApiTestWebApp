
Prerequisites:

- Create boot document for the test user

{
    "_id": "boot-document-test-app",
    "_rev": "19-bf6e4e862cedb8bd259a4f18f8264257",
    "authType": "",
    "bundleName": "",
    "channels": [
    "entity_Jacob_Grimberg_ge_com"
    ],
    "created_at": 1446851799498,
    "offlinePkgName": "",
    "pkgName": "data-app-px-end2end-test-app-2",
    "startTS": 1466851799498,
    "type": "boot",
    "updated_at": 1446851799498
}

 Put "data-app-px-end2end-test-app-2" for "pgName":


1. Check out project from git repo

2. cd to 'px-end2end-test-web-app'

3. Run 'pg doctor' to make sure connection is OK

4. Run 'gulp dist' to build dist folder

5. Run 'pg publish' to build .zip file and push it to couchDb

6. Start app on a mobile device

7. Click "Run Test" button to start executing tests


If you want to modify the app (add more tests)

1. Add new test to index.jade

        script(type='text/javascript', src='scripts/myNewTest.js')

2. gulp clean

3. gulp dist

4. pg publish




