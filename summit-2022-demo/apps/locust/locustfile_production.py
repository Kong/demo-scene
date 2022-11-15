# -*- coding: utf-8 -*-

from locust import HttpUser, task, between
import datetime
import random

class WebsiteUser(HttpUser):
    @task(2)
    def get_airports_v1(self):
        self.client.get("/airports/v1")

    @task(4)
    def get_cargo_v1(self):
        self.client.get("/cargo/v1")

    @task(10)
    def get_cargo_v2(self):
        self.client.get("/cargo/v2")


    def wait_time(self):
        now = datetime.datetime.now()
        if now.hour == 12:
            return random.uniform(0.2, 0.4)
        if now.hour > 9 and now.hour < 16:
            return random.uniform(0.2, 1)
        return random.uniform (0.4,1.5)


