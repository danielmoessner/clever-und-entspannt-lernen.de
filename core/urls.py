from django.conf import settings
from django.urls import re_path

from . import views

from django_distill import distill_path

app_name = "content"

urlpatterns = [
    distill_path('', views.IndexView.as_view(), name='index', distill_func=lambda: None, distill_file='index.html'),
    distill_path('kundenstimmen', views.CustomerReviewsView.as_view(), name='customerreviews',
                 distill_func=lambda: None, distill_file='kundenstimmen.html'),
    distill_path('kontakt', views.ContactView.as_view(), name='contact', distill_func=lambda: None,
                 distill_file='kontakt.html'),
    distill_path('ueber-mich', views.AboutView.as_view(), name='about', distill_func=lambda: None,
                 distill_file='ueber-mich.html'),
    distill_path('lerncoaching', views.StudyCoachingView.as_view(), name='studycoaching', distill_func=lambda: None,
                 distill_file='lerncoaching.html'),
    distill_path('entspannungscoaching', views.RelaxationCoachingView.as_view(), name='relaxationcoaching',
                 distill_func=lambda: None, distill_file='entspannungscoaching.html'),
    distill_path('impressum', views.ImpressumView.as_view(), name='impressum', distill_func=lambda: None,
                 distill_file='impressum.html'),
    distill_path('datenschutz', views.DatenschutzView.as_view(), name='datenschutz', distill_func=lambda: None,
                 distill_file='datenschutz.html')
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r'^(?!static).*assets.*$', views.StaticRedirectView.as_view(), name='static_redirect'),
        re_path(r'[a-z]*(/[a-z])*.html$', views.AnyHtmlView.as_view(), name='html_redirect')
    ]
