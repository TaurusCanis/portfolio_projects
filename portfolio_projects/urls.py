"""portfolio_projects URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework import routers
from ecommerce_backend import views
from django.shortcuts import render

router = routers.DefaultRouter()
router.register(r'items', views.ItemViewSet)
router.register(r'itemvariants', views.ItemVariantViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'orderitems', views.OrderItemViewSet)
router.register(r'refunds', views.RefundViewSet)
router.register(r'addresses', views.AddressViewSet)
router.register(r'mailinglistsubscribers', views.MailingListSubscriberViewSet)
router.register(r'coupons', views.CouponViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'payments', views.PaymentViewSet)

def render_react(request, *args, **kwargs):
    print("render_react")
    return render(request, "index.html")

def render_homepage(request, *args, **kwargs):
    print("render_homepage")
    return render(request, "homepage/homepage.html")

urlpatterns = [
    path("", render_homepage),
    path('ecommerce-api/', include(router.urls)),
    path('ecommerce-api/', include('ecommerce_backend.urls')),
    re_path(r'^ecommerce/(?P<path>([^/]+/)*)$', render_react),
    re_path(r'^ecommerce/$', render_react),
    # path('ecommerce/', render_react),
    # path('ecommerce/items/', render_react),
    # path('ecommerce/items/<int:id>/', render_react),
    # path('ecommerce/payment/', render_react),
    # path('ecommerce/checkout/', render_react),
    # path('ecommerce/success/', render_react),
    path('admin/', admin.site.urls),
    path('mbsr/', include('mbsr.urls')),
    path('budgeter/', include('budgeter.urls')),
    path('api-auth/', include('rest_framework.urls')),
    re_path(r"^$", render_react),
]

from django.views.defaults import page_not_found

def my_error_404(request, exception):
    template_name = '404.html'
    if request.path.startswith('/budgeter/'):
        template_name='budgeter/404.html'
    elif request.path.startswith('/mbsr/'):
        template_name='mbsr/404.html'
    return page_not_found(request, exception, template_name=template_name)

handler404 = my_error_404


  