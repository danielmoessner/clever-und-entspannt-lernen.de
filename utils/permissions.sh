chown -R root:www-data /home/susannesoelch_project
chmod -R 750 /home/susannesoelch_project
find /home/susannesoelch_project -type f -print0|xargs -0 chmod 740
chmod -R 770 /home/susannesoelch_project/susannesoelch/susannesoelch/media
find /home/susannesoelch_project/susannesoelch/susannesoelch/media -type f -print0|xargs -0 chmod 760
chmod 770 /home/susannesoelch_project/susannesoelch/logs
chmod -R 760 /home/susannesoelch_project/susannesoelch/logs/*
chmod 770 /home/susannesoelch_project/susannesoelch
chmod -R 760 /home/susannesoelch_project/susannesoelch/db.sqlite3
