FROM mysql

ENV MYSQL_DATABASE lpm

COPY initDB.sql /docker-entrypoint-initdb.d/