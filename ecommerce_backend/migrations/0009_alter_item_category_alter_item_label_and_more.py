# Generated by Django 4.1.2 on 2022-10-24 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce_backend', '0008_alter_item_category_alter_item_label'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(blank=True, choices=[('C', 'Clothing'), ('M', 'Mugs'), ('P', 'Posters'), ('T', 'Tip')], max_length=2, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='label',
            field=models.CharField(blank=True, choices=[('D', 'danger'), ('S', 'seconary'), ('P', 'primary')], max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='items',
            field=models.ManyToManyField(blank=True, to='ecommerce_backend.orderitem'),
        ),
    ]
