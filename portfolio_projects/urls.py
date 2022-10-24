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
from django.urls import include,path
from rest_framework import routers
from ecommerce_backend import views

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

urlpatterns = [
    path('ecommerce-api/', include(router.urls)),
    path('ecommerce-api/', include('ecommerce_backend.urls')),
    path('admin/', admin.site.urls),
    path('mbsr/', include('mbsr.urls')),
    path('api-auth/', include('rest_framework.urls'))
]

handler404 = 'mbsr.views.not_found_404'