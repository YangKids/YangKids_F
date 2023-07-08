# locustfile.py
from locust import HttpUser, task, between, TaskSet


class UserBehavior(HttpUser):
    @task
    def home(self):
        self.client.get('http://localhost:3000/Enterance')