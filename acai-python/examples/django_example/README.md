# Django Acai example

Contains a app called 'acai_example'. The app has one view in acai_example/views.py

### Setup before execution

All examples require installing the Acai Python SDK and setting your API key.

1. Install Acai Python SDK
   1. `pip install .`
2. Replace `YOUR API KEY` in example code with your acai project api key.

### To run this example 

First install Django:

`pip install django`

Then:

`python manage.py runserver`

In your browser open link http://127.0.0.1:8000/acai/ to see the view page in the example and a 'Page Loaded' event will be sent.

In your browser

1. Open http://127.0.0.1:8000/acai/pageloaded to see the app page and a 'Page Loaded' event will be sent.
2. Open http://127.0.0.1:8000/acai/identify?user_id=django_example_user to send an identify event for django_example_user
3. Open http://127.0.0.1:8000/acai/groupidentify?group_type=team&group_name=SDE to send a group identify event
4. Open http://127.0.0.1:8000/acai/setgroup?user_id=django_example_user&group_type=team&group_name=SDE to put django_example_user into SDE team
5. Open http://127.0.0.1:8000/acai/revenue?user_id=django_example_user&price=20&quantity=4 to track a revenue order
6. Open http://127.0.0.1:8000/acai/flush to flush events in buffer