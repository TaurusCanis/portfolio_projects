# Generated by Django 4.1.2 on 2022-10-16 23:02

from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import localflavor.us.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_id', models.CharField(blank=True, max_length=20, null=True)),
                ('street_address', models.CharField(max_length=200)),
                ('apartment_address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=100)),
                ('state', localflavor.us.models.USStateField(default='CT', max_length=2)),
                ('country', django_countries.fields.CountryField(max_length=2)),
                ('zip', models.CharField(max_length=100)),
                ('address_type', models.CharField(choices=[('B', 'billing'), ('S', 'shipping')], max_length=1)),
                ('default', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name_plural': 'Addresses',
            },
        ),
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=15)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=40, null=True)),
                ('last_name', models.CharField(blank=True, max_length=40, null=True)),
                ('email_address', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('discount_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('category', models.CharField(blank=True, choices=[('C', 'Clothing'), ('P', 'Posters'), ('T', 'Tip'), ('M', 'Mugs')], max_length=2, null=True)),
                ('label', models.CharField(blank=True, choices=[('D', 'danger'), ('P', 'primary'), ('S', 'seconary')], max_length=1, null=True)),
                ('slug', models.SlugField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('printful_product_id', models.IntegerField(blank=True, null=True)),
                ('thumbnail_url', models.CharField(blank=True, max_length=300, null=True)),
                ('printful_name', models.CharField(blank=True, max_length=300, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ItemVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('printful_variant_id', models.IntegerField(blank=True, null=True)),
                ('printful_item_variant_id', models.IntegerField(blank=True, null=True)),
                ('retail_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('sku', models.CharField(blank=True, max_length=2000, null=True)),
                ('product_id', models.IntegerField(blank=True, null=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.item')),
            ],
        ),
        migrations.CreateModel(
            name='MailingListSubscriber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=25)),
                ('email_address', models.EmailField(max_length=254)),
                ('date_subscribed', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref_code', models.CharField(blank=True, max_length=20, null=True)),
                ('session_id', models.CharField(blank=True, max_length=20, null=True)),
                ('printful_order_id', models.IntegerField(blank=True, null=True)),
                ('tax', models.CharField(blank=True, max_length=100, null=True)),
                ('vat', models.CharField(blank=True, max_length=100, null=True)),
                ('subtotal', models.CharField(blank=True, max_length=100, null=True)),
                ('grand_total', models.CharField(blank=True, max_length=100, null=True)),
                ('shipping_cost', models.CharField(blank=True, max_length=100, null=True)),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('ordered_date', models.DateTimeField()),
                ('ordered', models.BooleanField(default=False)),
                ('being_delivered', models.BooleanField(default=False)),
                ('received', models.BooleanField(default=False)),
                ('refund_requested', models.BooleanField(default=False)),
                ('refund_granted', models.BooleanField(default=False)),
                ('donation_added', models.BooleanField(default=False)),
                ('braintree_transaction_id', models.CharField(blank=True, default='0', max_length=100, null=True)),
                ('billing_address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='billing_address', to='ecommerce_backend.address')),
                ('coupon', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecommerce_backend.coupon')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.customer')),
            ],
        ),
        migrations.CreateModel(
            name='Refund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.TextField()),
                ('accepted', models.BooleanField(default=False)),
                ('email', models.EmailField(max_length=254)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.order')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stripe_payment_id', models.CharField(blank=True, max_length=100, null=True)),
                ('session_id', models.CharField(blank=True, max_length=20, null=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.customer')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_id', models.CharField(blank=True, max_length=20, null=True)),
                ('ordered', models.BooleanField(default=False)),
                ('quantity', models.IntegerField(default=1)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.itemvariant')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='items',
            field=models.ManyToManyField(to='ecommerce_backend.orderitem'),
        ),
        migrations.AddField(
            model_name='order',
            name='payment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecommerce_backend.payment'),
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_address',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='shipping_address', to='ecommerce_backend.address'),
        ),
        migrations.CreateModel(
            name='ItemVariantFiles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_id', models.IntegerField(blank=True, null=True)),
                ('url', models.CharField(max_length=200, null=True)),
                ('file_name', models.CharField(max_length=400)),
                ('item_variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.itemvariant')),
            ],
        ),
        migrations.AddField(
            model_name='address',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ecommerce_backend.customer'),
        ),
    ]