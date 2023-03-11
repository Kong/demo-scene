package io.kong.developer.servicereactive;

import org.springframework.aot.hint.MemberCategory;
import org.springframework.aot.hint.RuntimeHints;
import org.springframework.aot.hint.RuntimeHintsRegistrar;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportRuntimeHints;

import io.dekorate.kubernetes.annotation.Env;
import io.dekorate.kubernetes.annotation.KubernetesApplication;
import io.dekorate.kubernetes.annotation.Port;
import io.netty.buffer.AbstractByteBufAllocator;

import static io.kong.developer.servicereactive.ServiceReactiveApplication.QuoteServiceAppHints;

@SpringBootApplication
@KubernetesApplication(
    ports = @Port(name = "web", containerPort = 8080),
    envVars = @Env(name = "QUOTE_SERVICE", value = "backToFuture")
)
@ImportRuntimeHints(QuoteServiceAppHints.class)
public class ServiceReactiveApplication {

  public static void main(String[] args) {
    SpringApplication.run(ServiceReactiveApplication.class, args);
  }

  static class QuoteServiceAppHints implements RuntimeHintsRegistrar {

    @Override
    public void registerHints(final RuntimeHints hints, final ClassLoader classLoader) {
      hints.resources()
          .registerPattern("en-US.yml")
          .registerPattern("en.yml")
          .registerPattern("en/back_to_the_future.yml")
          .registerPattern("en/dune.yml")
          .registerPattern("en/chuck_norris.yml")
          .registerPattern("en/hobbit.yml")
          .registerPattern("en/*.yml")
          .registerPattern("kong-banner.txt")
      ;
      hints.reflection().registerType(AbstractByteBufAllocator.class, MemberCategory.INVOKE_DECLARED_METHODS);

    }
  }

}


