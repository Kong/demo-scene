# -*- coding: utf-8 -*-

from locust import HttpUser, task, between
import datetime
import random

class WebsiteUser(HttpUser):
    @task(2)
    def get_products(self):
        self.client.get("/")

    @task(1)
    def get_missing(self):
        self.client.get("/404")

    def wait_time(self):
        now = datetime.datetime.now()
        if now.hour == 12:
            return random.uniform(0.2, 0.4)
        if now.hour > 9 and now.hour < 16:
            return random.uniform(0.2, 1)
        return random.uniform (1,3)
