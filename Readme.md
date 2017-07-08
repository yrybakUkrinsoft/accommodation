# Accommodation project
Just a few things you need to do for starting the project:
1) Current project uses `PortgreSql` database. So, you need to create a special database with the special user for this purposes.
2) Create environmental variables for connection to the DB:
    ```
    AC_USER = 'username'
    AC_PASSWORD = 'user_password'
    AC_DB = 'database_name'
    ```
    In Windows OS you need:
    ```sh
    $ set NEW_VAR=SOMETHING
    ```
    In Linux OS you need:
    ```sh
    $ export NEW_VAR=SOMETHING
    ```
3) Now you need to create tables in the DB:
    - If you have the Navicat, here is the model for it: [navicat_model](./navicat_model)
    - Otherwise, here is generated file from the Navicat model: [tables.sql](./lib/addition/tables.sql)
4) Now you are available for cloning and installing dependencies for this project.
    ```sh
    $ git clone https://github.com/woolfi182/accommodation.git
    $ cd accommodation
    $ npm i
    ```
5) Now you can run the script for migration from the [reviews.json](./mock/reviews.json) to the DB. For that you need:
    ```sh
    $ npm run migration
    ```
6) Now all data moved to the DB and your project available for start it:
    ```sh
    $ npm start
    ```

    Server will listen port 4000 as default
7) Have fun!!!
