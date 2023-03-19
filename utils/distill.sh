python manage.py collectstatic --no-input || exit 0
python manage.py distill-local --force || exit 0
