from django.contrib.auth.models import User
from ecommerce_backend.models import Item, ItemVariant, OrderItem, Order, Customer, Address, Payment, Coupon, Refund, MailingListSubscriber
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    item_variants = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'title', 'price', 'description', 'image', 'item_variants']

    def get_item_variants(self, obj):
        return ItemVariantSerializer(obj.itemvariant_set.all(), many=True).data


class ItemVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariant
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    item_variant = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = '__all__'

    def get_item_variant(self, order_item):
        return ItemVariantSerializer(order_item.item).data

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()
    shipping_address = serializers.SerializerMethodField()
    billing_address = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_customer(self, order):
        return CustomerSerializer(order.customer).data

    def get_items(self, order):
        return OrderItemSerializer(order.items,many=True).data

    def get_shipping_address(self, order):
        return AddressSerializer(order.shipping_address).data

    def get_billing_address(self, order):
        return AddressSerializer(order.billing_address).data

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'

class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = '__all__'

class MailingListSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = MailingListSubscriber
        fields = '__all__'

