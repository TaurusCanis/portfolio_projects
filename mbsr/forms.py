from django import forms
from django.contrib.auth.forms import AuthenticationForm, UsernameField, UserCreationForm
from .models import *

class MyUserCreationForm(UserCreationForm):
    password1 = forms.CharField(
        label= ("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "current-password", "class": "input"}),
    )
    password2 = forms.CharField(
        label= ("Password confirmation"),
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "current-password", "class": "input"}),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self._meta.model.USERNAME_FIELD in self.fields:
            self.fields[self._meta.model.USERNAME_FIELD].widget.attrs[
                "class"
            ] = "input"

class MyLoginForm(AuthenticationForm):
    username = UsernameField(widget=forms.TextInput(attrs={"autofocus": True, "class": "input"}))
    password = forms.CharField(
        label= ("Password"),
        strip=False,
        widget=forms.PasswordInput(attrs={"autocomplete": "current-password", "class": "input"}),
    )

class GettingStartedResponseForm(forms.ModelForm):
    class Meta:
        model = GettingStartedResponse
        fields = ['end_of_course_hope', 'strengths', 'practice_time', 'practice_location', 'prep_time']
        widgets = {
            'end_of_course_hope': forms.Textarea(attrs={'class': 'textarea'}),
            'strengths': forms.Textarea(attrs={'class': 'textarea'}),
            'practice_time': forms.Textarea(attrs={'class': 'textarea'}),
            'practice_location': forms.Textarea(attrs={'class': 'textarea'}),
            'prep_time': forms.Textarea(attrs={'class': 'textarea'}),
        }

class FormalPracticeForm(forms.ModelForm):
    class Meta:
        model = FormalPractice
        exclude = ('mbsr_user', 'date')

        widgets = {
            'comment': forms.Textarea(attrs={'class': 'textarea'}),
        }

class InformalPracticeForm(forms.ModelForm):
    class Meta:
        model = InformalPractice
        # fields = '__all__'
        exclude = ('mbsr_user', 'date')
        widgets = {
            'situation': forms.Textarea(attrs={'class': 'textarea'}),
            'feelings_before': forms.Textarea(attrs={'class': 'textarea'}),
            'feelings_during': forms.Textarea(attrs={'class': 'textarea'}),
            'learned': forms.Textarea(attrs={'class': 'textarea'}),
            'feelings_now': forms.Textarea(attrs={'class': 'textarea'}),
        }