from django.views.generic import RedirectView
from django.views.generic import TemplateView
from django.http import HttpResponseRedirect

import re


class IndexView(TemplateView):
    template_name = 'susanne/index.html'


class CustomerReviewsView(TemplateView):
    template_name = 'susanne/customerreviews.html'


class ContactView(TemplateView):
    template_name = 'susanne/contact.html'


class AboutView(TemplateView):
    template_name = 'susanne/about.html'


class StudyCoachingView(TemplateView):
    template_name = 'susanne/study-coaching.html'


class RelaxationCoachingView(TemplateView):
    template_name = 'susanne/relaxation-coaching.html'


class ColorView(TemplateView):
    template_name = 'susanne/color-check.html'


class ImpressumView(TemplateView):
    template_name = 'susanne/impressum.html'


class DatenschutzView(TemplateView):
    template_name = 'susanne/datenschutz.html'


class StaticRedirectView(RedirectView):
    def get(self, request, *args, **kwargs):
        current_url = self.request.get_full_path()
        splitted_url = re.split(r'assets', current_url)
        url = ''.join(splitted_url[1:])
        static_url = '/static/' + url
        return HttpResponseRedirect(static_url)


class AnyHtmlView(TemplateView):
    def get(self, *args, **kwargs):
        current_url = self.request.get_full_path()
        current_url = current_url.strip('/')
        self.template_name = current_url
        return super().get(self, *args, **kwargs)
