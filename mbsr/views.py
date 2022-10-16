from django.shortcuts import render, redirect
from .forms import GettingStartedResponseForm, FormalPracticeForm, InformalPracticeForm, MyUserCreationForm, MyLoginForm
from .models import GettingStartedResponse, FormalPractice, InformalPractice, MBSRUser, FormalPracticePromptInfo, InformalPracticeInfo
from django.contrib.auth.models import User
from django.views.generic.edit import CreateView, FormView, DeleteView, BaseDetailView
from django.views.generic.base import TemplateView, RedirectView
from django.views import View
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.views import LoginView, LogoutView
from django import forms
from django.urls import reverse
from datetime import date
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.views.defaults import page_not_found
import datetime
from .util.MBSRUserUpdatesMixin import MBSRUserUpdatesMixin

class GettingStartedCreateView(LoginRequiredMixin, CreateView):
    login_url = 'mbsr:index'
    form_class = GettingStartedResponseForm
    model = GettingStartedResponse

    def form_valid(self, form):
        user = User.objects.get(id = self.request.user.id)
        mbsr_user = MBSRUser.objects.get(user=user)

        mbsr_user.has_started = True
        mbsr_user.is_in_week = 1
        mbsr_user.save()

        form.instance.mbsr_user = mbsr_user

        return super().form_valid(form)

    def get_success_url(self):
        return reverse('mbsr:account_home_view', kwargs={'pk': self.object.mbsr_user.id})

class GettingStartedDetailView(LoginRequiredMixin, DetailView):
    login_url = 'mbsr:index'
    template_name = "mbsr/gettingstartedresponse_detail.html"

    def get_mbsr_user(self):
        user = User.objects.get(id = self.request.user.id)
        return MBSRUser.objects.get(user=user)

    def get_object(self):
        try:
            obj = GettingStartedResponse.objects.get(mbsr_user=self.get_mbsr_user().id)
            print("TRY SUCCESSFUL")
            return obj
        except:
            print("FAILURE")
            messages.error(self.request, 'Info not found.')
            return reverse('mbsr:account_home_view', kwargs={'pk': self.get_mbsr_user()})

class FormalPracticeCreateView(LoginRequiredMixin, CreateView, MBSRUserUpdatesMixin):
    login_url = 'mbsr:index'
    model = FormalPractice
    form_class = FormalPracticeForm

    def form_invalid(self, form):
        return super().form_invalid(form)

    def form_invalid(self, form):
        print(form.errors)
        return super().form_invalid(form)
    
    def form_valid(self, form):
        mbsr_user = MBSRUser.objects.get(user_id = self.request.user.id) 
        form.instance.mbsr_user = mbsr_user
        form.instance.date = self.get_date()
        form.instance.day = mbsr_user.day_of_week
        form.instance.week = mbsr_user.is_in_week
        form.save()
        self.update_practice_logs("formal")
        return super().form_valid(form)

    def get_user(self):
        return MBSRUser.objects.get(user=self.request.user.id)

    def get_success_url(self):
        return reverse('mbsr:account_home_view', kwargs={'pk': self.object.mbsr_user.id})

    def get_context_data(self, **kwargs):
        context = super(FormalPracticeCreateView, self).get_context_data(**kwargs)
        week = MBSRUser.objects.get(user_id = self.request.user.id).is_in_week
        date = datetime.date.today()
        context['date'] = date.strftime("%A %d. %B %Y")
        context['week'] = week
        context['instructions'] = FormalPracticePromptInfo.objects.get(week=week)
        return context

class FormalPracticeListView(LoginRequiredMixin, ListView):
    model = FormalPractice

    def get_user(self):
        return MBSRUser.objects.get(user=self.request.user.id)

    def get_queryset(self):
        return FormalPractice.objects.filter(mbsr_user=self.get_user()).order_by("-date")

class FormalPracticeDetailView(LoginRequiredMixin, DetailView):
    login_url = 'mbsr:index'
    template_name = "mbsr/formalpractice_view.html"

    def get_user(self):
        return MBSRUser.objects.get(user=self.request.user.id)

    def get_object(self):
        print("DATE: ", self.kwargs['date'])
        return FormalPractice.objects.get(mbsr_user=self.get_user(), date=self.kwargs['date'])

class InformalPracticeCreateView(LoginRequiredMixin, CreateView, MBSRUserUpdatesMixin):
    login_url = 'mbsr:index'
    model = InformalPractice
    form_class = InformalPracticeForm

    def form_valid(self, form):
        # mbsr_user = MBSRUser.objects.get(user_id = self.request.user.id) 
        mbsr_user = self.get_user()
        form.instance.mbsr_user = mbsr_user
        form.instance.date = self.get_date()
        form.instance.week = mbsr_user.is_in_week
        form.instance.day = mbsr_user.day_of_week
        form.save()
        self.update_practice_logs("informal")
        return super().form_valid(form) 

    def get_user(self):
        return MBSRUser.objects.get(user=self.request.user.id)

    def get_success_url(self):
        return reverse('mbsr:account_home_view', kwargs={'pk': self.object.mbsr_user.id})

    def get_context_data(self, **kwargs):
        context = super(InformalPracticeCreateView, self).get_context_data(**kwargs)
        week = MBSRUser.objects.get(user_id = self.request.user.id).is_in_week
        date = datetime.date.today()
        context['date'] = date.strftime("%A, %B %d, %Y")
        context['week'] = week
        context['instructions'] = InformalPracticeInfo.objects.get(week=week)
        return context

class InformalPracticeDetailView(LoginRequiredMixin, DetailView):
    login_url = 'mbsr:index'
    
    template_name = "mbsr/informalpractice_view.html"
    # model = InformalPractice

    def get_user(self):
        return MBSRUser.objects.get(user=self.request.user.id)

    def get_object(self):
        print("DATE: ", self.kwargs['date'])
        return InformalPractice.objects.get(mbsr_user=self.get_user(), date=self.kwargs['date'])

    def get_context_data(self, **kwargs):
        context = super(InformalPracticeDetailView, self).get_context_data(**kwargs)
        context['instructions'] = InformalPracticeInfo.objects.get(week=self.get_user().is_in_week)
        return context

class InformalPracticeListView(LoginRequiredMixin, ListView):
    model = InformalPractice

    def get_user(self):
        return MBSRUser.objects.get(user=self.request.user.id)

    def get_queryset(self):
        return InformalPractice.objects.filter(mbsr_user=self.get_user())
    
class IndexView(View):
    def get(self, request):
        form_classes = { 
            'login': AuthenticationForm,
            'signup': MyUserCreationForm,
        }
        return render(request, 'mbsr/index.html', form_classes)

class SignUpView(CreateView):
    form_class = MyUserCreationForm
    template_name = "mbsr/register_new_user.html"
    
    def form_valid(self,form):
        print("FORM VALID")
        new_user = self.create_new_mbsr_user(form)
        new_user = form.save()
        if new_user is not None:
            login(self.request, new_user)
            return redirect('mbsr:account_home_view', pk = new_user.id)
        else:
            return super().form_invalid(form)
            # return redirect('/mbsr/signup_view/') 

    def form_invalid(self, form):
        print("<<<<<-----FORM INVALID----->>>>>")
        print("FORM ERRORS: ", form.errors)
        return super().form_invalid(form)

    def create_new_mbsr_user(self, form):
        username=form.cleaned_data['username']
        # email=form.cleaned_data['email']
        password=form.cleaned_data['password1']

        # new_user = User.objects.create_user(username, email, password)
        # new_user.save()

        self.object = form.save()

        new_mbsr_user = MBSRUser(user=self.object)
        new_mbsr_user.save()

        user = authenticate(username=username, password=password)

        return user

class MyLoginView(LoginView):
    form_class = MyLoginForm
    def get_success_url(self):
        url = 'mbsr:account_view_redirect'
        return reverse(url)

# def logout(request):
#     django_logout(request)
#     return redirect("mbsr:index")

class MyLogoutView(LogoutView):
    def dispatch(self, request, *args, **kwargs):
        auth_logout(request)
        next_page = reverse('mbsr:index')
        if next_page:
            # Redirect to this page until the session has been cleared.
            return redirect(next_page)
        return super().dispatch(request, *args, **kwargs)


class AccountHomeView(LoginRequiredMixin, DetailView):
    login_url = 'mbsr:index'
    
    template_name = "mbsr/account_home.html"
    model = MBSRUser

    def get_object(self):
        # return User.objects.get(id=self.request.user.id)
        return MBSRUser.objects.get(user_id = self.request.user.id) 

    def get_context_data(self, **kwargs):
        # mbsr_user = MBSRUser.objects.get(user_id = self.request.user.id) 
        mbsr_user = self.get_object()
        formal_practice_qs = FormalPractice.objects.filter(mbsr_user=self.get_object()).order_by('-date')
        formal_practice_exists = formal_practice_qs.filter(mbsr_user=self.get_object(),date__contains = date.today()).exists()
        informal_practice_exists = InformalPractice.objects.filter(mbsr_user=self.get_object(),date__contains = date.today()).exists()

        context = super(AccountHomeView, self).get_context_data()

        today = date.today()

        context['formal_practice_exists'] = formal_practice_exists
        context['informal_practice_exists'] = informal_practice_exists
        context['date_today'] = today
        context['day_of_mbsr_week'] = mbsr_user.day_of_week # if formal_practice_qs.exists() and formal_practice_qs.first().date.date() < today else mbsr_user.day_of_week - 1

        return context

class AccountHomeRedirectView(RedirectView):
    def get_redirect_url(self):
        return reverse("mbsr:account_home_view", kwargs={'pk': self.request.user.id})


def not_found_404(request, exception):
    template_name = 'mbsr/404.html'
    return page_not_found(request, exception, template_name=template_name)