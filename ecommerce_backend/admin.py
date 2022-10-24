from django.contrib import admin
from .models import Item, Order, OrderItem, ItemVariant

admin.site.register(Item)
admin.site.register(ItemVariant)
admin.site.register(Order)
admin.site.register(OrderItem)