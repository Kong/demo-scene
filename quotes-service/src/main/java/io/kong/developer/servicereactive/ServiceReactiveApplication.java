package io.kong.developer.servicereactive;

import com.github.javafaker.Faker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.dekorate.kubernetes.annotation.Env;
import io.dekorate.kubernetes.annotation.KubernetesApplication;
import io.dekorate.kubernetes.annotation.Port;

@SpringBootApplication
@KubernetesApplication(
    ports = @Port(name = "web", containerPort = 8080),
    envVars = @Env(name = "QUOTE_SERVICE", value = "backToFuture")
)
public class ServiceReactiveApplication {

  public static void main(String[] args) {
    SpringApplication.run(ServiceReactiveApplication.class, args);
  }
}
