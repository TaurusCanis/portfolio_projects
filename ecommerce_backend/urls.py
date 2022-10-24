from django.urls import include, path, re_path

from . import views
from ecommerce_backend.views import StripePaymentIntent, StripeWebhook

app_name = 'ecommerce_backend'
urlpatterns = [
    path('create-payment-intent/<str:session_id>/', StripePaymentIntent.as_view(), name='create-stripe-checkout-session'),
    path('stripe-webhook/', StripeWebhook.as_view(), name='stripe-webhook'),
] 



# handler404 = 'ecommerce_backend.views.not_found_404'
# handler500 = 'ecommerce_backend.views.my_custom_error_view'
# handler403 = 'ecommerce_backend.views.my_custom_permission_denied_view'
# handler400 = 'ecommerce_backend.views.my_custom_bad_request_view'