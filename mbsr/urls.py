from django.urls import include, path, re_path

from . import views
from mbsr.views import (
    GettingStartedCreateView, FormalPracticeCreateView, InformalPracticeCreateView, 
    IndexView, SignUpView, MyLoginView, AccountHomeView, MyLogoutView, AccountHomeRedirectView, 
    FormalPracticeDetailView, InformalPracticeDetailView, InformalPracticeListView, FormalPracticeListView,
    GettingStartedDetailView
)
from django.contrib.auth import views as auth_views

app_name = 'mbsr'
urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    
    path('getting_started_create_view/', GettingStartedCreateView.as_view(), name='getting_started_create_view'),
    path('getting_started_detail_view/', GettingStartedDetailView.as_view(), name='getting_started_detail_view'),
    path('formal_practice_create_view/', FormalPracticeCreateView.as_view(), name='formal_practice_create_view'),
    path('formal_practice_list_view/', FormalPracticeListView.as_view(), name='formal_practice_list_view'),
    path('formal_practice_detail_view/<date>/', FormalPracticeDetailView.as_view(), name='formal_practice_detail_view'),
    path('informal_practice_create_view/', InformalPracticeCreateView.as_view(), name='informal_practice_create_view'),
    path('informal_practice_list_view/', InformalPracticeListView.as_view(), name='informal_practice_list_view'),
    path('informal_practice_detail_view/<date>/', InformalPracticeDetailView.as_view(), name='informal_practice_detail_view'),
    path('signup_view/', SignUpView.as_view(), name='signup_view'),
    # path('login_view/', LogInView.as_view(), name='login_view'),
    path('account_home_view/<pk>/', AccountHomeView.as_view(), name='account_home_view'),
    path('login/', MyLoginView.as_view(template_name='mbsr/login.html'), name="login"),
    path('logout/', MyLogoutView.as_view(), name="logout"),
    # path('logout/', views.logout , name="logout"),
    path('account_view_redirect/', AccountHomeRedirectView.as_view(), name="account_view_redirect"),
    # path('accounts/', include('django.contrib.auth.urls')),
] 



handler404 = 'mbsr.views.not_found_404'
# handler500 = 'mbsr.views.my_custom_error_view'
# handler403 = 'mbsr.views.my_custom_permission_denied_view'
# handler400 = 'mbsr.views.my_custom_bad_request_view'