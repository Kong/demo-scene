package io.kong.developer.servicereactive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
