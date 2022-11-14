# Generated by Django 4.1.2 on 2022-11-07 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_backend', '0020_remove_address_country_alter_address_address_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='address_type',
            field=models.CharField(choices=[('B', 'billing'), ('S', 'shipping')], max_length=1),
        ),
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(blank=True, choices=[('M', 'Mugs'), ('P', 'Posters'), ('T', 'Tip'), ('C', 'Clothing')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(blank=True, choices=[('D', 'danger'), ('P', 'primary'), ('S', 'seconary')], max_length=1, null=True),
        ),
    ]